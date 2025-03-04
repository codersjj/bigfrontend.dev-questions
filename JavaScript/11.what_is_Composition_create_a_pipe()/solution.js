/**
 * @param {Array<(arg: any) => any>} funcs 
 * @return {(arg: any) => any}
 */
function pipe(funcs) {
	// your code here
	// return function(arg) {
	// 	let res = arg
	// 	funcs.forEach(func => {
	// 		res = func.call(this, res)
	// 	})

	// 	return res
	// }

	// or

	return function(arg) {
		return funcs.reduce((res, func) => {
			return func.call(this, res)
		}, arg)
	}
}
