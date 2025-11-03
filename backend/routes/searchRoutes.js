
const newSearch = new Search({
  userId: req.user._id,
  term: term,
  timestamp: new Date(),
});
await newSearch.save();
