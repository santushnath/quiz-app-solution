const storageKeyPrefix = "dorik";

const _storageKey = (key) => `${storageKeyPrefix}-${key}`;

const getData = (key) => {
	return new Promise((resolve) => {
		const data = window.localStorage.getItem(_storageKey(key));

		resolve(data ? JSON.parse(data) : []);
	});
};

const setData = (key, data, id = null) => {
	return new Promise((resolve) => {
		if (Array.isArray(data)) {
			window.localStorage.setItem(_storageKey(key), JSON.stringify(data));
		} else {
			getData(key).then((res) => {
				if (id) {
					const index = res.findIndex((e) => e.id === id);
					window.localStorage.setItem(
						_storageKey(key),
						JSON.stringify([
							...res.slice(0, index),
							{ ...data },
							...res.slice(index + 1),
						])
					);
				} else {
					window.localStorage.setItem(
						_storageKey(key),
						JSON.stringify([...res, data])
					);
				}
			});
		}
		resolve();
	});
};

const getDataItem = (key, id) => {
	return new Promise((resolve) => {
		let data = null;
		getData(key).then((res) => {
			data = res.find((e) => e.id === id) || null;
			resolve(data);
		});
	});
};

const deleteDataItem = (key, id) => {
	return new Promise((resolve) => {
		let data = null;
		getData(key).then((res) => {
			data = res.filter((e) => e.id !== id);
			setData(key, data);
			resolve(data);
		});
	});
};

export default { setData, getData, getDataItem, deleteDataItem };
