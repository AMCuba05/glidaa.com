const vrModeUi = {
	isSingleProp: false,
	dependencies: ['canvas'],
	schema: {
		enabled: {
			type: 'boolean',
			default: true,
		},
		enterVRButton: {
			type: 'selector',
		},
	},
};

export default vrModeUi;
