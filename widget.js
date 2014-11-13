WAF.define('WakCropImages', ['waf-core/widget'], function(widget) {
	
    var WakCropImages = widget.create('WakCropImages', {
    	
    	tagName : 'div',
    	
        init: function() {
        	
			this.render();
			
			this.eventsListeners();
			
        },
        
        placeholder: widget.property({
        	
    		type: 'string',
    		defaultValue: 'Drop files to crop (or click)',
    		bindable : false,
    		onChange:function(val){
    			this.placeholder(val);
    			this.$TapWork.find("p").text(val);
    		}
    	})

    });
    
    WakCropImages.prototype.render = function(){
    	
    	var $node = $(this.node);
    	
    	$node.empty();
    	
    	var CodeRenderHTML = "";
    	CodeRenderHTML += "<div class='crop-container' ><img src='' class='crop-image' ></img>";
		CodeRenderHTML += "<div class='crop-work' ></div>";
		CodeRenderHTML += "<input type='file' class='crop-input' ></input></div>";
		CodeRenderHTML += "<div class='crop-container-button' disabled>";
		CodeRenderHTML += "<button type='button' class='crop-button bRemove' value='' disabled ></button>";
		CodeRenderHTML += "<button type='button' class='crop-button bCrop' value='' disabled ></button>";
		CodeRenderHTML += "<button type='button' class='crop-button bUpload' value='' disabled ></button>";
		CodeRenderHTML += "</div>";
		
		$node.append(CodeRenderHTML);
			
		this.$Image = $node.find($('.crop-image'));
		this.$InputFile = $node.find($('.crop-input'));
		this.$TapWork = $node.find($('.crop-work'));
		this.$Remove = $node.find($('.bRemove'));
		this.$Crop = $node.find($('.bCrop'));
		this.$Upload = $node.find($('.bUpload'));
		this.$Preview;
		
		this.$TapWork.empty();
		this.$TapWork.append("<p style='font-size:18px;text-align:center;margin-top:50px;' ></p>");
		this.$TapWork.find("p").text(this.placeholder());
					
		this.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    	
    	this.data = null;
    };
    
    WakCropImages.prototype.eventsListeners = function(){
		
		this.eventListener_tapWork();
		this.eventListener_inputFile();
		this.eventListener_remove();
		this.eventListener_crop();
		this.eventListener_upload();
		
	};
    
    WakCropImages.prototype.eventListener_tapWork = function(){
    	
    	var self = this;
    	
		var event_type =  (self.device) ? 'touchstart' : 'mousedown';
		
		self.$TapWork.on(event_type,function(event){
			event.preventDefault();
			self.$InputFile.click();
		});
		
		this.$TapWork.on('dragover',function(e) {
		    e.preventDefault();
		    e.stopPropagation();
		});
		
		this.$TapWork.on('dragenter',function(e) {
		    e.preventDefault();
		    e.stopPropagation();
		});
		
		this.$TapWork.on('drop',function(e){
			
        	if(e.originalEvent.dataTransfer){
            	if(e.originalEvent.dataTransfer.files.length) {
                	e.preventDefault();
                	e.stopPropagation();
               		self.loadImage(e.originalEvent.dataTransfer.files[0]);
           	    }      
    		}
    		
		});
			
    };
    
    WakCropImages.prototype.eventListener_inputFile = function(){
    	
    	var self = this;
		
		this.$InputFile.on('change',function(event){
			var file = self.$InputFile.prop("files")[0];
			self.loadImage(file);
		});
			
    };
    
    WakCropImages.prototype.eventListener_remove = function(){
    	
    	var self = this;
		
		var event_type =  (self.device) ? 'touchstart' : 'mousedown';
		
		this.$Remove.on(event_type,function(event){
			
			self.$Image.cropper("destroy");
			self.$Image.attr("src","");
			
			if(self.$Crop.hasClass('bEdit')){
				self.$Crop.removeClass('bEdit').addClass('bCrop');
			}
			
			self.$Remove.prop("disabled",true);
			self.$Crop.prop("disabled",true);
			self.$Upload.prop("disabled",true);
			self.$InputFile.show();
			
			$(self.node).find($('.preview-data')).hide();
			
			self.$TapWork.show();
		});
			
    };
    
    WakCropImages.prototype.eventListener_crop = function(){
    	
    	var self = this;
    	
    	var event_type =  (self.device) ? 'touchstart' : 'mousedown';
    	
		this.$Crop.on(event_type,function(event){
			
			if($(this).hasClass('bCrop')){
				$(this).removeClass('bCrop').addClass('bEdit');
				self.loadCrop();
			}else if($(this).hasClass('bEdit')){
				$(this).removeClass('bEdit').addClass('bCrop');
				self.loadEdit();
			}
			
		});
			
    };
    
    WakCropImages.prototype.eventListener_upload = function(){
    	
    	var self = this;
    	
    	var event_type =  (self.device) ? 'touchstart' : 'mousedown';
    	
    	this.$Upload.on(event_type,function(){
    		self.fire('save',{dataUri:self.data});
    	});
    	
    };
    
    WakCropImages.prototype.loadImage = function(file){
    	
    	var self = this;
		var reader = new FileReader();

		reader.onloadend = function () {
	    	self.$Image.attr("src",reader.result);
	    	self.$Image.cropper({aspectRatio: 1.618});
			self.$TapWork.hide();
			self.$Remove.prop("disabled",false);
			self.$Crop.prop("disabled",false);
			self.$Upload.prop("disabled",true);
			self.$InputFile.hide();
	  	};

	  	if(file){
	    	reader.readAsDataURL(file);
	  	}else{
	    	self.$Image.attr("src","");
	  	}
    };
    
    WakCropImages.prototype.loadCrop = function(){
    	
    	var $node = $(this.node);
    	
    	var self = this;
    	
		$node.find($(".cropper-container")).hide();
		
		var dataURL = self.$Image.cropper("getDataURL", "image/png");
		
		$node.append("<div class='preview-data' ><img style='border:1px dashed black' ></img></div>");
		
		self.$Preview = $node.find($('.preview-data'));
		self.$Preview.hide();
		self.$Preview.css({
			'width':($node.width()/2)+'px',
			'height':($node.height()/2)+'px',
			'max-width':($node.width()/2)+'px',
			'max-height':($node.height()/2)+'px',
			'position':'absolute',
			'left':($node.width()/4)+'px',
			'top':($node.height()/4)+'px'
		});
		
		self.$Preview.find('img').css({
			'max-width':($node.width()/2)+'px',
			'max-height':($node.height()/2)+'px'
		});
		
		var imgObj = new Image();
		imgObj.src = dataURL;
		self.data = dataURL;
		self.$Preview.find('img').attr("src",imgObj.src);
		
    	imgObj.onload = function(){
    			
    		self.$Preview.show();
    		self.$Upload.prop("disabled",false);
    		
    		var maxWidth = self.$Preview.width();
    		var maxHeight = self.$Preview.height();
    		var currentWidth =  (imgObj.width > maxWidth) ? maxWidth : imgObj.width;
    		var currentHeight =  (imgObj.height > maxHeight) ? maxHeight : imgObj.height;
    		
    		self.$Preview.find('img').css({
	    		'position':'absolute',
				'left':((maxWidth - currentWidth)/2)+'px',
				'top':((maxHeight - currentHeight)/2)+'px'
    		});
    		
    	};
		
    };
    
    WakCropImages.prototype.loadEdit = function(){
    	
    	var $node = $(this.node);
		$node.find($(".cropper-container")).show();
		$node.find($('.preview-data')).remove();
		this.$Upload.prop("disabled",true);
		
    };

    return WakCropImages;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */