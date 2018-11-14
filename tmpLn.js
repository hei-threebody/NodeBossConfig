var tmp = require('tmp');

tmp.file({ postfix: '.txt', dir: '/Users/hei_threebody/Desktop'}, function _tempFileCreated(err, path, fd, cleanupCallback) {
	if (err) throw err;

	console.log('File: ', path);
	console.log('Filedescriptor: ', fd);

	// cleanupCallback();
});
