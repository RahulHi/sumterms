import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import TextVectorization
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import cgi

loaded_model = tf.keras.models.load_model('my_model')

form = cgi.FieldStorage()

new_predictions = loaded_model.predict(form['data'].value)

# Convert predictions to labels (e.g., 0 or 1 for binary classification)
new_predicted_labels = [1 if prediction > 0.5 else 0 for prediction in new_predictions]

# Print the results
output_list = []
for text, label in zip(new_texts, new_predicted_labels):
    if(label == 1):
        output_list.append(text)  

output_str=""
for output in output_list:
    output_str = output_str+output+"\n"
    
print(output_str)