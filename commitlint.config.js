module.exports = {
    // 继承的规则
    // extends: ['@commitlint/config-conventional'],
    // 定义规则类型
    roles: {
      // type的类型定义，类型的泛型。表示git提交的type必须在以下类型范围之内
      'type-enum': [
        // 当前验证的错误级别
        0,
        // 在什么情况下进行验证
        'never',
        // 泛型的内容
        [
          'feat',
          'fix',
          'docs',
          'style',
          'refactor',
          'perf',
          'test',
          'revert',
          'build',
          'chore',
        ],
      ],
      // subject的大小写不做校验
      'subject-case': [0],
    },
  }
  // 必须以utf-8保存