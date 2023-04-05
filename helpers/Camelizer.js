const Camelizer = {
	camelize: str => {
		let string = str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
				return index === 0 ? word.toLowerCase() : word.toUpperCase();
			})
			.replace(/\s+/g, "");
		return string.charAt(0).toLowerCase() + string.slice(1);
	},
	decamelize: str => str
}
export default Camelizer;