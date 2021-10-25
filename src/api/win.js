export const isWin = table => {

    console.log(table);

    for (let comb in combination) {

        if (
            table[combination[comb][0]] === table[combination[comb][1]] 
            && 
            table[combination[comb][1]] === table[combination[comb][2]] 
            &&
            table[combination[comb][2]] !== '' 
            ) {
                return {isWin: true, player: table[combination[comb][0]]}
            }
    }
    return false

} 

export const isSoonWin = table => {

    for (let comb in combination) {
        if (
            table[combination[comb][0]] === table[combination[comb][1]] 
            &&
            table[combination[comb][0]] === 'X' 
            ) {
                return {isSoonWin: true, player: combination[comb][2]}
            } else if (
                table[combination[comb][0]] === combination[comb][2] 
                &&
                table[combination[comb][0]] === 'X'
                ) {
                    return {isSoonWin: true, player: combination[comb][1]}
                } else if (
                    table[combination[comb][1]] === table[combination[comb][2]] 
                    &&
                    table[combination[comb][1]]  === 'X' 
                    ) {
                        return {isSoonWin: true, player: combination[comb][0]}
                    }
    }
    return false
}


const combination = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],

    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    
    ["1", "5", "9"],
    ["3", "5", "7"],
]