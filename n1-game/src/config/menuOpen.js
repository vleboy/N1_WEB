  export const menuOpen = function (name) {
    let openName = []
    if (name.includes('list')){
      openName = ["tool"];
    } else if (name == "gameList") {
      openName = ["gameList"];
    } else if (name == "operatorList") {
      openName = ["operatorList"];
    } else if (name == "gameHallConfig") {
      openName = ["gameHallConfig"];
    }
    return openName
  }
