import Character from '../Character';

test("should create a new character with random position 0 anf selector 'character'", () => {
    const character = new Character();
    expect(character.position).toBe(null);
    expect(character.selector).toBe('.character');
    expect(character.element).toBe(null);
})

