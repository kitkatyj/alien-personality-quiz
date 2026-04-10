export function getPersonalityType(letters: string): string {
	const upperLetters = letters.toUpperCase();

	const letterCounts = {
		I: (upperLetters.match(/I/g) || []).length,
		E: (upperLetters.match(/E/g) || []).length,
		S: (upperLetters.match(/S/g) || []).length,
		N: (upperLetters.match(/N/g) || []).length,
		F: (upperLetters.match(/F/g) || []).length,
		T: (upperLetters.match(/T/g) || []).length,
		P: (upperLetters.match(/P/g) || []).length,
		J: (upperLetters.match(/J/g) || []).length,
	};

	const result = [
		letterCounts.I >= letterCounts.E ? "I" : "E",
		letterCounts.S >= letterCounts.N ? "S" : "N",
		letterCounts.F >= letterCounts.T ? "F" : "T",
		letterCounts.P >= letterCounts.J ? "P" : "J",
	].join("");

	return result;
}

export function shuffle(array:[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at i and j using destructuring
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}