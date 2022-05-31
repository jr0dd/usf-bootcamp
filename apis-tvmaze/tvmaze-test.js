it('should resolve promise searchShows()', async () => {
  await expectAsync(searchShows('Oz')).toBeResolved()
})

it('should resolve promise getEpisodes()', async () => {
  await expectAsync(getEpisodes(748)).toBeResolved()
})

it('should return correct array size searchShows()', async () => {
  const arr = await searchShows('Oz')
  expect(arr).toHaveSize(10)
})

it('should return correct array size getEpisodes()', async () => {
  const arr = await getEpisodes(748)
  expect(arr).toHaveSize(56)
})