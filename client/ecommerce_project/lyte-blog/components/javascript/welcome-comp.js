 
Lyte.Component.register("welcome-comp",{
	data : function(){
		return {
			features : Lyte.attr("array"),
			allprds : Lyte.attr("array"),
			showModal: Lyte.attr("boolean"),
			productName : Lyte.attr("string"),
			productPrice : Lyte.attr("string"),
			prdUrl : Lyte.attr("string"),
			prdId : Lyte.attr("string"),

			// openModal: Lyte.attr("Boolean"),

		}
	},
	init: function () {
		
		this.setData('allprds', store.peekAll('products'));
		this.setData('showModal',false);
		// console.log(allprds);

	},
	actions: {
		openModal() {
		  this.setData('showModal', true);
		},
		closeModal() {
		  this.setData('showModal', false);
		},
		create() {
			try{

				console.log("harry-->fetching data");
			// cons[ole.log(this.getData('productName'));
			var record = store.createRecord("products",{id : this.getData('prdId'), prdName : this.getData('productName'), imageUrl : this.getData('prdUrl'), price : this.getData('productPrice') } ,true )
			record.$.save();
			console.log("harry-->post request");
			console.log(record);
			this.setData('showModal', false);


			}
			catch( ex)
			{
				console.log(ex);
			}
			this.setData('productName', '');
			this.setData('prdId', '');
			this.setData('prdUrl', '');
			this.setData('productPrice', '');
		  },
		check(event) {
			// Your logic here
			this.setData('showModal', false);
			console.log("Mouse down event triggered");
			console.log(event); // Logs the event object to the console
		  },

	},
	methods: {
		// setprdId: function (a) {
		// 	this.setData('prdId', a.newValue);
		// },
		// setproductName: function (a) {
		// 	this.setData('productName', a.newValue);
		// },
		// setprdUrl: function (a) {
		// 	this.setData('prdUrl', a.newValue);
		// },
		// setproductPrice: function (a) {
		// 	this.setData('productPrice', a.newValue);
		// },
	}
});
