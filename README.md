# voice-whatis

Ответы на вопросы. Идея в том, чтобы ввести соответствия "цвет - вкус", а потом при вводе цвета выдавать вкус.

Чтобы получить ответ, нужно начать вопрос со "что", е

База ответов выглядит примерно так:
``` json
[
  {
    id: 1,
    questions: ["в желто-зеленом"],
    answer: "бабл гам"
  },
  {
    id: 2,
    questions: ["в синем", "в голубом"],
    answer: "возможно арбуз"
  }
]
```

При вопросе "Что в синем бутыльке" будет получен ответ, если текст вопроса достаточно пересекается с одним из текстов, введенных в `questions`.
