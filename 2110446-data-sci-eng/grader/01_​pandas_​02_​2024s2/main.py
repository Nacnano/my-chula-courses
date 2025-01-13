import pandas as pd
import json

# Q1: Number of rows after removing duplicates
def Q1(gb_videos):
    unique_rows = gb_videos.drop_duplicates()
    return len(unique_rows)

# Q2: Number of unique titles where dislikes > likes
def Q2(gb_videos):
    dislikes_more_than_likes = gb_videos[gb_videos['dislikes'] > gb_videos['likes']]
    unique_titles = dislikes_more_than_likes['title'].nunique()
    return unique_titles

# Q3: Number of VDOs trending on 22 Jan 2018 with comments > 10,000
def Q3(gb_videos):
    trending_date = "18.22.01"  # Format: 'YY.DD.MM'
    trending_videos = gb_videos[
        (gb_videos['trending_date'] == trending_date) & (gb_videos['comment_count'] > 10000)
    ]
    return len(trending_videos)

# Q4: Date with the minimum average number of comments per VDO
def Q4(gb_videos):
    avg_comments_by_date = gb_videos.groupby('trending_date')['comment_count'].mean()
    min_avg_date = avg_comments_by_date.idxmin()
    return min_avg_date

# Q5: Days with more total daily views in "Sports" than in "Comedy"
def Q5(gb_videos, gb_category_path):
    with open(gb_category_path, 'r') as file:
        categories = json.load(file)
    
    # Map category IDs to titles
    category_mapping = {int(item['id']): item['snippet']['title'] for item in categories['items']}
    gb_videos['category_title'] = gb_videos['category_id'].map(category_mapping)
    
    sports_views = gb_videos[gb_videos['category_title'] == 'Sports'].groupby('trending_date')['views'].sum()
    comedy_views = gb_videos[gb_videos['category_title'] == 'Comedy'].groupby('trending_date')['views'].sum()
    
    sports_more_than_comedy = (sports_views > comedy_views).sum()
    return sports_more_than_comedy

def main():
    import sys
    input_question = input().strip()
    
    # File paths
    gb_videos_path = "/data/GBvideos.csv"
    gb_category_path = "/data/GB_category_id.json"
    
    # Load GBvideos.csv into a DataFrame
    gb_videos = pd.read_csv(gb_videos_path)
    
    # Call respective functions based on input
    if input_question == "Q1":
        print(Q1(gb_videos))
    elif input_question == "Q2":
        print(Q2(gb_videos))
    elif input_question == "Q3":
        print(Q3(gb_videos))
    elif input_question == "Q4":
        print(Q4(gb_videos))
    elif input_question == "Q5":
        print(Q5(gb_videos, gb_category_path))
    else:
        print("Invalid Question")

if __name__ == "__main__":
    main()
