module.exports = {
	listFiles : function() {
		var fs = BrowserFS.BFSRequire('fs');
		fs.readdirSync("/", (err, files) => {
			files.forEach(file => {
				console.warn(file);
			});
		})
	},
	localStorageTest : function (){
		var fs = BrowserFS.BFSRequire('fs');
		BrowserFS.configure({ fs: "LocalStorage" }, function (e) {
			console.log(fs.readdirSync('/'));
		});
	},
  configureBrowserFS: function() {
	fetch('brill.zip').then(function(response) {
		return response.arrayBuffer();
	}).then(function(zipData) {
		//should be global via webpack?
		var Buffer = BrowserFS.BFSRequire('buffer').Buffer;
		BrowserFS.configure({
					fs: "ZipFS",
					options: {
						zipData: Buffer.from(zipData)
					}
			//----------------
			// fs: "OverlayFS",
			// options: {
			// 	readable: {
			// 		fs: "ZipFS",
			// 		options: {
			// 			zipData: Buffer.from(zipData)
			// 		}
			// 	},
			// 	writable: {
			// 		fs: "LocalStorage"
			// 	}
			// }
			//---------------
		    // fs: "MountableFileSystem",
		    // options: {
		    //   "/zip": {
				// 		fs: "ZipFS",
				// 		options: {
				// 			// Wrap as Buffer object.
				// 			zipData: Buffer.from(zipData)
				// 			//zipData: bufferGlobal.from(zipData)
				// 		}
		    //   },
				// 	"/tmp": { fs: "InMemory" },
				// 	"/home": { fs: "IndexedDB" }
		    // }
		  }, function(e) {
		    if (e) {
		      // An error occurred.
		      throw e;
		    }
		    // Otherwise, BrowserFS is ready to use!
		  });
		});
  }
};
