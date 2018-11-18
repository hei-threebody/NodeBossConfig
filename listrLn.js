const Listr = require('listr');
const tasks = new Listr([
	{
		title: 'Success',
		task: () => 'Foo'
	},
	{
		title: 'Failure',
		task: () => {
			return "Failure"	
			// throw new Error('Bar')
		}
	}
]);

const tasks2 = new Listr([
	{
		title: 'Success',
		task: () => Promise.resolve('Foo')
	},
	{
		title: 'Failure',
		task: () => Promise.reject(new Error('Bar'))
	}
])

const tasks3 = new Listr([
	{
		title: 'Success',
		task: () => {
			return new Observable(observer => {
				observer.next('Foo');

				setTimeout(() => {
					observer.next('Bar');
				}, 2000);

				setTimeout(() => {
					observer.complete();
				}, 4000);
			});
		}
	},
	{
		title: 'Failure',
		task: () => Promise.reject(new Error('Bar'))
	}
]);
tasks3.run().catch(err => {
	console.error(err);
});
