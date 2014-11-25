## WakCropImages Widget for [Wakanda](http://wakanda.org)

The __WakCropImages__ widget allows you to display a image editor, which crop and resize image. The result of your editing, you can upload to wakanda server's folder or in an attribute of type image. This widget is based on the Image Cropper plugin -written by Fengyuan Chen (https://github.com/fengyuanchen/cropper).

### Properties
This widget has the following properties:

* __Placeholder__: Placeholder of the widget
* __Label__: Label of the widget
* __Folder__: Destination Folder image
* __Source__: DataSource destination
* __Image Attributte__: Image attribute destination where the image will be saved

### Methods
This widget has the following methods:

* __getValue__: Get the result of editing. The result this format DataURI.


### Events
This widget has the following events:

* __AfterUpload__: Fired after having uploaded the file
* __ErrorUpload__: Fired when there is an error in the file upload


### More Information
For more information on how to install a custom widget, refer to [Installing a Custom Widget](http://doc.wakanda.org/WakandaStudio0/help/Title/en/page3869.html#1027761).

For more information about Custom Widgets, refer to [Custom Widgets](http://doc.wakanda.org/Wakanda0.v5/help/Title/en/page3863.html "Custom Widgets") in the [Architecture of Wakanda Applications](http://doc.wakanda.org/Wakanda0.v5/help/Title/en/page3844.html "Architecture of Wakanda Applications") manual.
