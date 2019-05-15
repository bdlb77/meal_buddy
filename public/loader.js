if ('serviceWorker' in navigator) {
	try {
		navigator.serviceWorker.register('sw.js');
		console.log('SW registered');
	} catch (err) {
		console.log(err);
	}
}

// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', () => {
// 		navigator.serviceWorker
// 			.register('/sw.js')
// 			.then(registration => {
// 				console.log('SW registered: ', registration);
// 				// registration.pushManager.subscribe({ userVisibleOnly: true });
// 			})
// 			.catch(registrationError => {
// 				console.log('SW registration failed: ', registrationError);
// 			});
// 	});
// }
