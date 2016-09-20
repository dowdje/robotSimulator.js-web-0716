'use strict';

function Robot(){
    this.bearing = 'north'
    this.coordinates = [0,0]

}

Robot.prototype.orient = function(direction){
    if ( direction === 'north' || direction === 'south' || direction === 'east' || direction === 'west'){
      this.bearing = direction
    }
    else{
      throw new Error("Invalid Robot Bearing")

  }
    }

Robot.prototype.turnRight = function(){
  switch(this.bearing){
    case 'north':
      this.bearing = 'east'
      break;
    case 'west':
      this.bearing = 'north'
      break;
    case 'east':
      this.bearing = 'south'
      break;
    default:
      this.bearing = 'west'
  }
}

Robot.prototype.turnLeft = function(){

  switch(this.bearing){
    case 'north':
      this.bearing = 'west'
      break;
    case 'west':
      this.bearing = 'south'
      break;
    case 'east':
      this.bearing = 'north'
      break;
    default:
      this.bearing = 'east'
  }
}

Robot.prototype.place = function(map){
  this.coordinates[0] = map.x
  this.coordinates[1] = map.y
  this.orient(map.direction)
}

Robot.prototype.advance = function(){
  switch(this.bearing){
    case 'east':
      this.coordinates[0] += 1
      break;
    case 'west':
      this.coordinates[0] -= 1
      break;
    case 'north':
      this.coordinates[1]  += 1
      break;
    case 'south':
      this.coordinates[1] -= 1
      break;   
    }
}

Robot.prototype.at = function(x, y){
  this.coordinates[0] = x
  this.coordinates[1] = y

}

Robot.prototype.instructions = function(command){
  var com_arr = []
  command.split("").forEach(function(char){
    switch(char){
      case 'A':
        com_arr.push("advance")
        break;
      case 'L':
        com_arr.push('turnLeft')
        break;
      case 'R':
        com_arr.push('turnRight')
        break;
      default:
        throw new Error(char + " is not a valid command.")
    }
  })
    return com_arr
}

Robot.prototype.evaluate = function(inst){
  this.instructions(inst).forEach((ruct)=>{
    this[ruct]()
  })
}

