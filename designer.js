(function(WakCropImages) {

    WakCropImages.setWidth('320');
    WakCropImages.setHeight('200');
    
    WakCropImages.addEvent('afterUpload');
    WakCropImages.addEvent('errorUpload');

    WakCropImages.addLabel({
        'defaultValue': 'Label',
        'position': 'top'
    });

});