(function(WakCropImages) {

    WakCropImages.setWidth('320');
    WakCropImages.setHeight('200');
    
    WakCropImages.addEvent('save');

    /* Add a Label property */
    WakCropImages.addLabel({
        'defaultValue': 'Label',
        'position': 'top'
    });

});