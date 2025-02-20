import math, copy
import numpy as np
import matplotlib.pyplot as plt
# plt.style.use('./deeplearning.mplstyle')
# from lab_utils_uni import plt_house_x, plt_contour_wgrad, plt_divergence, plt_gradients

# Here is some pseudo-code expressing my understanding of gradient descent
# Recall this is the notation for the function to update w : 
# w = w - 𝜶 * 𝛿/𝛿w * 1/2m * 𝛴((wxi + b) - yi))^2
# Which simplifies to the following (by the rules of calculus, we don't square, we multiply 2x)
# w = w - 𝜶 * 1/2m * 𝛴((wxi + b) - yi))2xi
# Recall that we expand fw,b(xi) to wxi + b (linear function), then cancel the 2s out : 
# w = w - 𝜶 * 1/m * 𝛴((wxi + b) - yi))xi
# And similarly, we have the following for b, which omits the *xi :
# b = b - 𝜶 * 1/m * 𝛴(fw,b(xi) - yi))
# Again we expand fw,b(xi) to wxi + b (linear function)
# b = b - 𝜶 * 1/m * 𝛴((wxi + b) - yi))
# So the 2 relevant function definitions are : 
# w = w - 𝜶 * 1/m * 𝛴((wxi + b) - yi))xi
# b = b - 𝜶 * 1/m * 𝛴(wxi + b - yi))


# The following was written by Q : 
# def gradient_step(x_train, y_train, w, b, learning_rate):
#     """
#     Performs a single gradient step
#     """
#     m = x_train.shape[0]
#     dw = 0
#     db = 0
#     for i in range(m):
#         f_wb = w * x_train[i] + b
#         dw_i = (f_wb - y_train[i]) * x_train[i]
#         db_i = f_wb - y_train[i]
#         dw += dw_i
#         db += db_i
#     dw = dw / m
#     db = db / m
#     w = w - learning_rate * dw
#     b = b - learning_rate * db
#     return w, b

# Here's my version based on the 2 relevant function definitions :
# w = w - 𝜶 * 1/m * 𝛴((wxi + b) - yi))xi
# b = b - 𝜶 * 1/m * 𝛴(wxi + b - yi))
def gradient_step(x_train, y_train, curr_w, curr_b, learning_rate):
    m = x_train.shape[0]
    # derivatives of w and b
    d_w = 0 
    d_b = 0
    for i in range(m):
        curr_guess = curr_w * x_train[i] + curr_b
        d_w += (curr_guess - y_train[i]) * x_train[i]
        d_b += curr_guess - y_train[i]
    d_w = d_w / m
    d_b = d_b / m
    # IMPORTANT!!! In ML implementations, we don't subtract the learning rate at this point so that 
    # we can simplify the use of vectorization!!! To me this is easier when looping, but when you
    # go to vectorize this, it makes more sense to to this part later in the gradient_descent function
    new_w = curr_w - (learning_rate * d_w)
    new_b = curr_b - (learning_rate * d_b)
    return new_w, new_b

# Here is the cost function from before : 
def cost(w, b, x_train, y_train): 
    m = x_train.shape[0]
    cost_sum = 0
    for n in range(m):
        cost_sum += ((w * x_train[n] - b) - y_train[n]) ** 2
    return cost_sum/(m * 2)

# So then how would we implement gradient descent given these? 
# Well the trick is : repeat until convergence
# TODO ! this is incomplete. The solution given in the lab is here : 
# https://www.coursera.org/learn/machine-learning/ungradedLab/uaIsm/optional-lab-linear-regression-with-scikit-learn
# ... this solution would have the gradient_step function compute the derivitives and then do the subtraction 
# from current w and b in the gradient_descent function, in addition, it uses a num_itars variable to simply run the
# gradient descent function 100,000 times. I hypothesize that there is a faster solution with a non-fixed learning rate.
# However I see the appeal of this solution, with a very predictable running time. 
def gradient_descent(x_train, y_train, w, b, learning_rate):
    itars = 0
    curr_cost = None
    tmp_cost = cost(w, b, x_train, y_train)
    while tmp_cost < curr_cost or curr_cost is None:
        itars += 1
        if itars > 100000 :
            exit()
        [new_w]
        tmp_cost = cost(w, b, x_train, y_train)
        


