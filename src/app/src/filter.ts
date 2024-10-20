import { Creature } from "../features/creature"

class Filter {

  filterNamesToIDs(names: string[], creatures: Creature[]): number[] {
    let ids: number[] = [];
    names.map((name, _index) => {
      creatures.forEach(function (c) {
        if (c.Name === name) {
          ids.push(c.id)
        }
      })
    })
    return ids;
  }

}

export { Filter };
