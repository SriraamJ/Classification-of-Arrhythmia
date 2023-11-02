import os
import numpy as np
from flask import Flask, request, render_template
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# from PIL import Image
from keras.preprocessing.image import load_img, img_to_array
# from keras.preprocessing.image import img_to_array
from keras.models import load_model

app = Flask(__name__)
model = load_model('ECG_CNN_Model.h5')

@app.route("/")
@app.route("/predict")
def test():
    return render_template("/search.html")

@app.route("/info")
def information():
    return render_template("/info.html")

@app.route("/predict",methods=["GET","POST"])
def upload():
    if request.method == 'POST':
        f = request.files['file']
        basepath = os.path.dirname('__file__')
        filepath = os.path.join(basepath, "uploads", f.filename)
        f.save(filepath)

        img = load_img(filepath, target_size=(64, 64))
        x = img_to_array(img)
        x = np.expand_dims(x, axis=0)

        num_classes = 7 # 6+1 with Unknown
        decision_threshold = 0.9

        preds = model.predict(x)

        max_pred = np.max(preds)
        print("Max Prediction = ",max_pred)

        pred = np.argmax(preds, axis=1)
        print("Prediction", pred)

        class_index = pred[0]
        if max_pred >= decision_threshold:
            class_index = pred[0]
        else:
            class_index = num_classes - 1
        print("Class Index = ",class_index)
        
        index = ['Left Bundle Branch Block', 'Normal', 'Premature Atrial Contraction',
                 'Premature Ventricular Contraction', 'Right Bundle Branch Block', 'Ventricular Fibrillation', 'Unknown']
        result = str(index[class_index])
        print("Result = ",result)

        cachefile = open('cache.txt', 'a+')
        cachefile.write(filepath+"  -----   "+result+"\n")
        cachefile.close()
        cachefile = open('cache.txt', 'r')
        cachelog = cachefile.readlines()
        print("*****************************")
        print(cachelog)
        print("*****************************")
        print(type(cachelog))
        print("*****************************")
        cachefile.close()

        resultList = [result, cachelog]
        return resultList
    return None


# port = int(os.getenv("PORT"))
if __name__ == "__main__":
    app.run(debug=False)
    # app.run(host='0.0.0.0', port=8000)
