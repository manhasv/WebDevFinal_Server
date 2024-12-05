export default [
  {
    "_id": "1",
    "user": "uid",
    "quiz": "qid",
    "attempts": [
      { start: "time string", // but actually a number
        submitted: false,
        submittedAt: 0, // update when submitting
        answers: [null, null, "", [""]] }], // order kept with indices
  },
];
