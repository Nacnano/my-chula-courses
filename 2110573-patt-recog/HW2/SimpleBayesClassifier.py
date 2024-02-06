import random as rnd
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from scipy import stats

class SimpleBayesClassifier:

    def __init__(self, n_pos, n_neg):
        
        """
        Initializes the SimpleBayesClassifier with prior probabilities.

        Parameters:
        n_pos (int): The number of positive samples.
        n_neg (int): The number of negative samples.
        
        Returns:
        None: This method does not return anything as it is a constructor.
        """

        self.n_pos = n_pos
        self.n_neg = n_neg
        self.prior_pos = n_pos / (n_pos+n_neg)
        self.prior_neg = n_neg / (n_pos+n_neg)

    def fit_params(self, x, y, n_bins = 10):

        """
        Computes histogram-based parameters for each feature in the dataset.

        Parameters:
        x (np.ndarray): The feature matrix, where rows are samples and columns are features.
        y (np.ndarray): The target array, where each element corresponds to the label of a sample.
        n_bins (int): Number of bins to use for histogram calculation.

        Returns:
        (stay_params, leave_params): A tuple containing two lists of tuples, 
        one for 'stay' parameters and one for 'leave' parameters.
        Each tuple in the list contains the bins and edges of the histogram for a feature.
        """

        self.stay_params = [(None, None) for _ in range(x.shape[1])]
        self.leave_params = [(None, None) for _ in range(x.shape[1])]

        # INSERT CODE HERE

        for idx in range(x.shape[1]):
            stay_x = np.where(y == 0, x[:, idx], np.nan)
            stay_x = stay_x[~np.isnan(stay_x)]
            leave_x = np.where(y == 1, x[:, idx], np.nan)
            leave_x = leave_x[~np.isnan(leave_x)]

            bins, edges = np.histogram(stay_x, bins=n_bins)
            edges[0] = float('-inf')
            edges[-1] = float('inf')
            bins = bins / np.sum(bins)
            self.stay_params[idx] = (bins, edges)

            bins, edges = np.histogram(leave_x, bins=n_bins)
            edges[0] = float('-inf')
            edges[-1] = float('inf')
            bins = bins / np.sum(bins)
            self.leave_params[idx] = (bins, edges)
            
        
        return self.stay_params, self.leave_params

    def predict(self, x, thresh = 0):

        """
        Predicts the class labels for the given samples using the non-parametric model.

        Parameters:
        x (np.ndarray): The feature matrix for which predictions are to be made.
        thresh (float): The threshold for log probability to decide between classes.

        Returns:
        result (list): A list of predicted class labels (0 or 1) for each sample in the feature matrix.
        """

        y_pred = []

        # INSERT CODE HERE
        for i in range(x.shape[0]):
            h = np.log(self.prior_pos) - np.log(self.prior_neg)
            for j in range(x.shape[1]):
                if x[i, j] is np.nan:
                    continue
                stay_bin_idx = np.digitize(x[i, j], self.stay_params[j][1]) - 1
                leave_bin_idx = np.digitize(x[i, j], self.leave_params[j][1]) - 1
                h -= np.log(self.stay_params[j][0][stay_bin_idx])
                h += np.log(self.leave_params[j][0][leave_bin_idx])
            
            if h > thresh:
                y_pred.append(1)
            else:
                y_pred.append(0)
    
        return np.array(y_pred)

    
    def fit_gaussian_params(self, x, y):

        """
        Computes mean and standard deviation for each feature in the dataset.

        Parameters:
        x (np.ndarray): The feature matrix, where rows are samples and columns are features.
        y (np.ndarray): The target array, where each element corresponds to the label of a sample.

        Returns:
        (gaussian_stay_params, gaussian_leave_params): A tuple containing two lists of tuples,
        one for 'stay' parameters and one for 'leave' parameters.
        Each tuple in the list contains the mean and standard deviation for a feature.
        """

        self.gaussian_stay_params = [(0, 0) for _ in range(x.shape[1])]
        self.gaussian_leave_params = [(0, 0) for _ in range(x.shape[1])]

        # INSERT CODE HERE
        for idx in range(x.shape[1]):
            stay_x = np.where(y == 0, x[:, idx], np.nan)
            stay_x = stay_x[~np.isnan(stay_x)]
            leave_x = np.where(y == 1, x[:, idx], np.nan)
            leave_x = leave_x[~np.isnan(leave_x)]

            self.gaussian_stay_params[idx] = (np.mean(stay_x), np.std(stay_x))
            self.gaussian_leave_params[idx] = (np.mean(leave_x), np.std(leave_x))

        
        return self.gaussian_stay_params, self.gaussian_leave_params
    
    
    def gaussian_predict(self, x, thresh = 0):

        """
        Predicts the class labels for the given samples using the parametric model.

        Parameters:
        x (np.ndarray): The feature matrix for which predictions are to be made.
        thresh (float): The threshold for log probability to decide between classes.

        Returns:
        result (list): A list of predicted class labels (0 or 1) for each sample in the feature matrix.
        """

        y_pred = []

        # INSERT CODE HERE

        for idx in range(x.shape[0]):
            h = np.log(self.prior_pos) - np.log(self.prior_neg)
            for j in range(x.shape[1]):
                if x[idx, j] is np.nan:
                    continue
                stay_mean, stay_std = self.gaussian_stay_params[j]
                leave_mean, leave_std = self.gaussian_leave_params[j]

                h -= np.log(stats.norm(stay_mean, stay_std).pdf(x[idx, j]))
                h += np.log(stats.norm(leave_mean, leave_std).pdf(x[idx, j]))
            
            if h > thresh:
                y_pred.append(1)
            else:
                y_pred.append(0)

        return np.array(y_pred)