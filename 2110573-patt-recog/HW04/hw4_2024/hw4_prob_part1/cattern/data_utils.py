
import os
from glob import glob
import pandas as pd
from functools import reduce
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_score, recall_score, f1_score
#from keras.callbacks import ModelCheckpoint, ReduceLROnPlateau

article_types = ['article', 'encyclopedia', 'news', 'novel']

def generate_words(files):
    """
    Transform list of files to list of words,
    removing new line character
    and replace name entity '<NE>...</NE>' and abbreviation '<AB>...</AB>' symbol
    """

    repls = {'<NE>' : '','</NE>' : '','<AB>': '','</AB>': ''}

    words_all = []
    for i, file in enumerate(files):
        lines = open(file, 'r')
        for line in lines:
            line = reduce(lambda a, kv: a.replace(*kv), repls.items(), line)
            words = [word for word in line.split("|") if word is not '\n']
            words_all.extend(words)
    return words_all


def create_char_dataframe(words):
    """
    Give list of input tokenized words,
    create dataframe of characters where first character of
    the word is tagged as 1, otherwise 0
    Example
    =======
    ['กิน', 'หมด'] to dataframe of
    [{'char': 'ก', 'type': ..., 'target': 1}, ...,
     {'char': 'ด', 'type': ..., 'target': 0}]
    """
    char_dict = []
    for word in words:
        for i, char in enumerate(word):
            if i == 0:
                char_dict.append({'char': char,
                                  #'type': CHAR_TYPE_FLATTEN.get(char, 'o'),
                                  'target': True})
            else:
                char_dict.append({'char': char,
                                  # 'type': CHAR_TYPE_FLATTEN.get(char, 'o'),
                                  'target': False})
    return pd.DataFrame(char_dict)


def generate_best_dataset(best_path, output_path='cleaned_data', create_val=False):
    """
    Generate CSV file for training and testing data
    Input
    =====
    best_path: str, path to BEST folder which contains unzipped subfolder
        'article', 'encyclopedia', 'news', 'novel'
    cleaned_data: str, path to output folder, the cleaned data will be saved
        in the given folder name where training set will be stored in `train` folder
        and testing set will be stored on `test` folder
    create_val: boolean, True or False, if True, divide training set into training set and
        validation set in `val` folder
    """
    if not os.path.isdir(output_path):
        os.mkdir(output_path)
    if not os.path.isdir(os.path.join(output_path, 'train')):
        os.makedirs(os.path.join(output_path, 'train'))
    if not os.path.isdir(os.path.join(output_path, 'test')):
        os.makedirs(os.path.join(output_path, 'test'))
    if not os.path.isdir(os.path.join(output_path, 'val')) and create_val:
        os.makedirs(os.path.join(output_path, 'val'))

    for article_type in article_types:
        files = glob(os.path.join(best_path, article_type, '*.txt'))
        files_train, files_test = train_test_split(files, random_state=0, test_size=0.1)
        if create_val:
            files_train, files_val = train_test_split(files_train, random_state=0, test_size=0.1)
            val_words = generate_words(files_val)
            val_df = create_char_dataframe(val_words)
            val_df.to_csv(os.path.join(output_path, 'val', 'df_best_{}_val.csv'.format(article_type)), index=False)
        train_words = generate_words(files_train)
        test_words = generate_words(files_test)
        train_df = create_char_dataframe(train_words)
        test_df = create_char_dataframe(test_words)
        train_df.to_csv(os.path.join(output_path, 'train', 'df_best_{}_train.csv'.format(article_type)), index=False)
        test_df.to_csv(os.path.join(output_path, 'test', 'df_best_{}_test.csv'.format(article_type)), index=False)
        print("Save {} to CSV file".format(article_type))


