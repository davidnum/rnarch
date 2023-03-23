module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setGenerator('feature', {
    description: 'Generator for feature',
    prompts: [featurePrompt, getScreenPrompt(false)],
    actions: data => {
      const actions = [
        {
          type: 'addMany',
          destination: 'src/features/{{dashCase name}}',
          base: 'plop-templates/feature',
          templateFiles: 'plop-templates/feature/**',
        },
      ];

      if (data.screenName) {
        return [...actions, ...screenActions];
      }

      return actions;
    },
  });

  plop.setGenerator('feature-screen', {
    description: 'Generator for feature screen',
    prompts: [featurePrompt, getScreenPrompt(true)],
    actions: screenActions,
  });

  plop.setGenerator('feature-component', {
    description: 'Generator for feature component',
    prompts: [featurePrompt, componentPrompt],
    actions: [
      {
        type: 'addMany',
        destination:
          'src/features/{{dashCase name}}/presentation/components/{{dashCase componentName}}',
        base: 'plop-templates/component',
        templateFiles: 'plop-templates/component/**',
      },
      {
        type: 'add',
        path: 'src/features/{{dashCase name}}/presentation/components/index.ts',
        skipIfExists: true,
      },
      {
        type: 'append',
        template: "export * from './{{dashCase componentName}}';\n",
        path: 'src/features/{{dashCase name}}/presentation/components/index.ts',
        separator: '',
      },
    ],
  });
};

const screenActions = [
  {
    type: 'addMany',
    destination:
      'src/features/{{dashCase name}}/presentation/screens/{{dashCase screenName}}',
    base: 'plop-templates/screen',
    templateFiles: 'plop-templates/screen/**',
  },
  {
    type: 'add',
    path: 'src/features/{{dashCase name}}/presentation/screens/index.ts',
    skipIfExists: true,
  },
  {
    type: 'append',
    template: "export * from './{{dashCase screenName}}';\n",
    path: 'src/features/{{dashCase name}}/presentation/screens/index.ts',
    separator: '',
  },
];

const featurePrompt = {
  type: 'input',
  name: 'name',
  message: 'Please enter feature name',
  validate: value => {
    if (value) {
      return true;
    }
    return 'Feature name is required';
  },
};

const componentPrompt = {
  type: 'input',
  name: 'componentName',
  message: 'Please enter component name',
  validate: value => {
    if (value) {
      return true;
    }
    return 'Component name is required';
  },
};

const getScreenPrompt = isRequired => ({
  type: 'input',
  name: 'screenName',
  message: 'Please enter screen name',
  validate: value => {
    if (value || !isRequired) {
      return true;
    }
    return 'Screen name is required';
  },
});
