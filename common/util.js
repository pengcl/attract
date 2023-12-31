function friendlyDate(timestamp) {
	var formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	var now = Date.now();
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);

	var diffType = '';
	var diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}

const validateControl = (control) => {
	let valid = true;
	if (control.required) {
		valid = control.value !== '' && control.value !== null && control.value !== undefined;
		if (control.validates) {
			const prefixRegExp = String(control.validates);
			const regExp = new RegExp(prefixRegExp);
			valid = regExp.test(control.value);
		}
	} else {
		if (control.validates) {
			valid = new RegExp(String(control.validates)).test(control.value);
		}
	}
	return valid;
}
const listToTree = (data, options) => {
	options = options || {};
	const ID_KEY = options.idKey || 'id';
	const PARENT_KEY = options.parentKey || 'parentId';
	const CHILDREN_KEY = options.childrenKey || 'items';
	const items = [];
	  data.forEach(item => {
	    items.push(item);
	  });
	  items.sort((a, b) => {
	    return a.order - b.order;
	  });

	const tree = [];
	const childrenOf = {};
	let item;
	let id;
	let parentId;
	for (let i = 0, length = items.length; i < length; i++) {
		item = items[i];
		id = item[ID_KEY];
		parentId = item[PARENT_KEY] || 'root';
		// every item may have children
		childrenOf[id] = childrenOf[id] || [];
		// init its children
		item[CHILDREN_KEY] = childrenOf[id];
		if (parentId !== 'root') {
			// init its parent's children object
			childrenOf[parentId] = childrenOf[parentId] || [];
			// push it into its parent's children object
			childrenOf[parentId].push(item);
		} else {
			tree.push(item);
		}
	}

	return tree;
}
export {
	friendlyDate,
	validateControl,
	listToTree
}