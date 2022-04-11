const checkTypeAdvantage = (attacking, defending) => {
    let damage = 1;

    if (attacking == "normal") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 1;
                break;
            case "flying":
                damage = damage * 1;
                break;
            case "poison":
                damage = damage * 1;
                break;    
            case "ground":
                damage = damage * 1;
                break;
            case "rock":
                damage = damage * 0.5;
                break;
            case "bug":
                damage = damage * 1;
                break;
            case "ghost":
                damage = damage * 0;
                break;
            case "steel":
                damage = damage * 0.5;
                break;
            case "fire":
                damage = damage * 1;
                break;
            case "water":
                damage = damage * 1;
                break;
            case "grass":
                damage = damage * 1;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 1;
                break;        
            case "dark":
                damage = damage * 1;
                break;
            case "fairy":
                damage = damage * 1;
                break;
            case null:
                damage = damage;
                break;
            }
    }

    else if (attacking == "fighting") {
        switch(defending) {
            case "normal":
                damage = damage * 2;
                break;
            case "fighting":
                damage = damage * 1;
                break;
            case "flying":
                damage = damage * 0.5;
                break;
            case "poison":
                damage = damage * 0.5;
                break;    
            case "ground":
                damage = damage * 1;
                break;
            case "rock":
                damage = damage * 2;
                break;
            case "bug":
                damage = damage * 0.5;
                break;
            case "ghost":
                damage = damage * 0;
                break;
            case "steel":
                damage = damage * 2;
                break;
            case "fire":
                damage = damage * 1;
                break;
            case "water":
                damage = damage * 1;
                break;
            case "grass":
                damage = damage * 1;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 0.5;
                break;
            case "ice":
                damage = damage * 2;
                break;
            case "dragon":
                damage = damage * 1;
                break;        
            case "dark":
                damage = damage * 2;
                break;
            case "fairy":
                damage = damage * 0.5;
                break;
            case null:
                damage = damage;
                break;
            }
    }

    else if (attacking == "flying") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 2;
                break;
            case "flying":
                damage = damage * 1;
                break;
            case "poison":
                damage = damage * 1;
                break;    
            case "ground":
                damage = damage * 1;
                break;
            case "rock":
                damage = damage * 0.5;
                break;
            case "bug":
                damage = damage * 2;
                break;
            case "ghost":
                damage = damage * 1;
                break;
            case "steel":
                damage = damage * 0.5;
                break;
            case "fire":
                damage = damage * 1;
                break;
            case "water":
                damage = damage * 1;
                break;
            case "grass":
                damage = damage * 2;
                break;    
            case "electric":
                damage = damage * 0.5;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 1;
                break;        
            case "dark":
                damage = damage * 1;
                break;
            case "fairy":
                damage = damage * 1;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "poison") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 1;
                break;
            case "flying":
                damage = damage * 1;
                break;
            case "poison":
                damage = damage * 0.5;
                break;    
            case "ground":
                damage = damage * 0.5;
                break;
            case "rock":
                damage = damage * 0.5;
                break;
            case "bug":
                damage = damage * 1;
                break;
            case "ghost":
                damage = damage * 0.5;
                break;
            case "steel":
                damage = damage * 0;
                break;
            case "fire":
                damage = damage * 1;
                break;
            case "water":
                damage = damage * 1;
                break;
            case "grass":
                damage = damage * 2;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 1;
                break;        
            case "dark":
                damage = damage * 1;
                break;
            case "fairy":
                damage = damage * 2;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "ground") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 1;
                break;
            case "flying":
                damage = damage * 0;
                break;
            case "poison":
                damage = damage * 2;
                break;    
            case "ground":
                damage = damage * 1;
                break;
            case "rock":
                damage = damage * 2;
                break;
            case "bug":
                damage = damage * 0.5;
                break;
            case "ghost":
                damage = damage * 1;
                break;
            case "steel":
                damage = damage * 2;
                break;
            case "fire":
                damage = damage * 2;
                break;
            case "water":
                damage = damage * 1;
                break;
            case "grass":
                damage = damage * 0.5;
                break;    
            case "electric":
                damage = damage * 2;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 1;
                break;        
            case "dark":
                damage = damage * 1;
                break;
            case "fairy":
                damage = damage * 1;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "rock") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 0.5;
                break;
            case "flying":
                damage = damage * 2;
                break;
            case "poison":
                damage = damage * 1;
                break;    
            case "ground":
                damage = damage * 0.5;
                break;
            case "rock":
                damage = damage * 1;
                break;
            case "bug":
                damage = damage * 2;
                break;
            case "ghost":
                damage = damage * 1;
                break;
            case "steel":
                damage = damage * 0.5;
                break;
            case "fire":
                damage = damage * 2;
                break;
            case "water":
                damage = damage * 1;
                break;
            case "grass":
                damage = damage * 1;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 2;
                break;
            case "dragon":
                damage = damage * 1;
                break;        
            case "dark":
                damage = damage * 1;
                break;
            case "fairy":
                damage = damage * 1;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "bug") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 0.5;
                break;
            case "flying":
                damage = damage * 0.5;
                break;
            case "poison":
                damage = damage * 0.5;
                break;    
            case "ground":
                damage = damage * 1;
                break;
            case "rock":
                damage = damage * 1;
                break;
            case "bug":
                damage = damage * 1;
                break;
            case "ghost":
                damage = damage * 0.5;
                break;
            case "steel":
                damage = damage * 0.5;
                break;
            case "fire":
                damage = damage * 0.5;
                break;
            case "water":
                damage = damage * 1;
                break;
            case "grass":
                damage = damage * 2;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 2;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 1;
                break;        
            case "dark":
                damage = damage * 2;
                break;
            case "fairy":
                damage = damage * 0.5;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "ghost") {
        switch(defending) {
            case "normal":
                damage = damage * 0;
                break;
            case "fighting":
                damage = damage * 1;
                break;
            case "flying":
                damage = damage * 1;
                break;
            case "poison":
                damage = damage * 1;
                break;    
            case "ground":
                damage = damage * 1;
                break;
            case "rock":
                damage = damage * 1;
                break;
            case "bug":
                damage = damage * 1;
                break;
            case "ghost":
                damage = damage * 2;
                break;
            case "steel":
                damage = damage * 1;
                break;
            case "fire":
                damage = damage * 1;
                break;
            case "water":
                damage = damage * 1;
                break;
            case "grass":
                damage = damage * 1;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 2;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 1;
                break;        
            case "dark":
                damage = damage * 0.5;
                break;
            case "fairy":
                damage = damage * 1;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "steel") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 1;
                break;
            case "flying":
                damage = damage * 1;
                break;
            case "poison":
                damage = damage * 1;
                break;    
            case "ground":
                damage = damage * 1;
                break;
            case "rock":
                damage = damage * 2;
                break;
            case "bug":
                damage = damage * 1;
                break;
            case "ghost":
                damage = damage * 1;
                break;
            case "steel":
                damage = damage * 0.5;
                break;
            case "fire":
                damage = damage * 0.5;
                break;
            case "water":
                damage = damage * 0.5;
                break;
            case "grass":
                damage = damage * 1;
                break;    
            case "electric":
                damage = damage * 0.5;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 2;
                break;
            case "dragon":
                damage = damage * 1;
                break;        
            case "dark":
                damage = damage * 1;
                break;
            case "fairy":
                damage = damage * 2;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "fire") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 1;
                break;
            case "flying":
                damage = damage * 1;
                break;
            case "poison":
                damage = damage * 1;
                break;    
            case "ground":
                damage = damage * 1;
                break;
            case "rock":
                damage = damage * 0.5;
                break;
            case "bug":
                damage = damage * 2;
                break;
            case "ghost":
                damage = damage * 1;
                break;
            case "steel":
                damage = damage * 2;
                break;
            case "fire":
                damage = damage * 0.5;
                break;
            case "water":
                damage = damage * 0.5;
                break;
            case "grass":
                damage = damage * 2;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 2;
                break;
            case "dragon":
                damage = damage * 0.5;
                break;        
            case "dark":
                damage = damage * 1;
                break;
            case "fairy":
                damage = damage * 1;
                break;
            case null:
                damage = damage;
                break;
            }
    }

    else if (attacking == "water") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 1;
                break;
            case "flying":
                damage = damage * 1;
                break;
            case "poison":
                damage = damage * 1;
                break;    
            case "ground":
                damage = damage * 2;
                break;
            case "rock":
                damage = damage * 2;
                break;
            case "bug":
                damage = damage * 1;
                break;
            case "ghost":
                damage = damage * 1;
                break;
            case "steel":
                damage = damage * 1;
                break;
            case "fire":
                damage = damage * 2;
                break;
            case "water":
                damage = damage * 0.5;
                break;
            case "grass":
                damage = damage * 0.5;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 0.5;
                break;        
            case "dark":
                damage = damage * 1;
                break;
            case "fairy":
                damage = damage * 1;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "grass") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 1;
                break;
            case "flying":
                damage = damage * 0.5;
                break;
            case "poison":
                damage = damage * 0.5;
                break;    
            case "ground":
                damage = damage * 2;
                break;
            case "rock":
                damage = damage * 2;
                break;
            case "bug":
                damage = damage * 0.5;
                break;
            case "ghost":
                damage = damage * 1;
                break;
            case "steel":
                damage = damage * 0.5;
                break;
            case "fire":
                damage = damage * 0.5;
                break;
            case "water":
                damage = damage * 2;
                break;
            case "grass":
                damage = damage * 0.5;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 0.5;
                break;        
            case "dark":
                damage = damage * 1;
                break;
            case "fairy":
                damage = damage * 1;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "electric") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 1;
                break;
            case "flying":
                damage = damage * 2;
                break;
            case "poison":
                damage = damage * 1;
                break;    
            case "ground":
                damage = damage * 0;
                break;
            case "rock":
                damage = damage * 1;
                break;
            case "bug":
                damage = damage * 1;
                break;
            case "ghost":
                damage = damage * 1;
                break;
            case "steel":
                damage = damage * 1;
                break;
            case "fire":
                damage = damage * 1;
                break;
            case "water":
                damage = damage * 2;
                break;
            case "grass":
                damage = damage * 0.5;
                break;    
            case "electric":
                damage = damage * 0.5;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 0.5;
                break;        
            case "dark":
                damage = damage * 1;
                break;
            case "fairy":
                damage = damage * 1;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "psychic") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 2;
                break;
            case "flying":
                damage = damage * 1;
                break;
            case "poison":
                damage = damage * 2;
                break;    
            case "ground":
                damage = damage * 1;
                break;
            case "rock":
                damage = damage * 1;
                break;
            case "bug":
                damage = damage * 1;
                break;
            case "ghost":
                damage = damage * 1;
                break;
            case "steel":
                damage = damage * 0.5;
                break;
            case "fire":
                damage = damage * 1;
                break;
            case "water":
                damage = damage * 1;
                break;
            case "grass":
                damage = damage * 1;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 0.5;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 1;
                break;        
            case "dark":
                damage = damage * 0;
                break;
            case "fairy":
                damage = damage * 1;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "ice") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 1;
                break;
            case "flying":
                damage = damage * 2;
                break;
            case "poison":
                damage = damage * 1;
                break;    
            case "ground":
                damage = damage * 2;
                break;
            case "rock":
                damage = damage * 1;
                break;
            case "bug":
                damage = damage * 1;
                break;
            case "ghost":
                damage = damage * 1;
                break;
            case "steel":
                damage = damage * 0.5;
                break;
            case "fire":
                damage = damage * 0.5;
                break;
            case "water":
                damage = damage * 0.5;
                break;
            case "grass":
                damage = damage * 2;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 0.5;
                break;
            case "dragon":
                damage = damage * 2;
                break;        
            case "dark":
                damage = damage * 1;
                break;
            case "fairy":
                damage = damage * 1;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "dragon") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 1;
                break;
            case "flying":
                damage = damage * 1;
                break;
            case "poison":
                damage = damage * 1;
                break;    
            case "ground":
                damage = damage * 1;
                break;
            case "rock":
                damage = damage * 1;
                break;
            case "bug":
                damage = damage * 1;
                break;
            case "ghost":
                damage = damage * 1;
                break;
            case "steel":
                damage = damage * 0.5;
                break;
            case "fire":
                damage = damage * 1;
                break;
            case "water":
                damage = damage * 1;
                break;
            case "grass":
                damage = damage * 1;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 2;
                break;        
            case "dark":
                damage = damage * 1;
                break;
            case "fairy":
                damage = damage * 0;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "dark") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 0.5;
                break;
            case "flying":
                damage = damage * 1;
                break;
            case "poison":
                damage = damage * 1;
                break;    
            case "ground":
                damage = damage * 1;
                break;
            case "rock":
                damage = damage * 1;
                break;
            case "bug":
                damage = damage * 1;
                break;
            case "ghost":
                damage = damage * 2;
                break;
            case "steel":
                damage = damage * 1;
                break;
            case "fire":
                damage = damage * 1;
                break;
            case "water":
                damage = damage * 1;
                break;
            case "grass":
                damage = damage * 1;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 2;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 1;
                break;        
            case "dark":
                damage = damage * 0.5;
                break;
            case "fairy":
                damage = damage * 0.5;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == "fairy") {
        switch(defending) {
            case "normal":
                damage = damage * 1;
                break;
            case "fighting":
                damage = damage * 2;
                break;
            case "flying":
                damage = damage * 1;
                break;
            case "poison":
                damage = damage * 0.5;
                break;    
            case "ground":
                damage = damage * 1;
                break;
            case "rock":
                damage = damage * 1;
                break;
            case "bug":
                damage = damage * 1;
                break;
            case "ghost":
                damage = damage * 1;
                break;
            case "steel":
                damage = damage * 0.5;
                break;
            case "fire":
                damage = damage * 0.5;
                break;
            case "water":
                damage = damage * 1;
                break;
            case "grass":
                damage = damage * 1;
                break;    
            case "electric":
                damage = damage * 1;
                break;
            case "psychic":
                damage = damage * 1;
                break;
            case "ice":
                damage = damage * 1;
                break;
            case "dragon":
                damage = damage * 2;
                break;        
            case "dark":
                damage = damage * 2;
                break;
            case "fairy":
                damage = damage * 1;
                break;
            case null:
                damage = damage;
                break;
            }
    }
    else if (attacking == null) {
        damage = damage;
    }

    // console.log(attacking,defending,damage)

    return attacking, defending, damage;
}