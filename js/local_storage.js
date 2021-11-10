function set_data_obj(i){
    localStorage.setItem('obj',JSON.stringify(i))
}
function get_data_obj(){
    return JSON.parse(localStorage.getItem('obj'))
}
function set_data_history(i) {
    localStorage.setItem('history',JSON.stringify(i))
}
function get_data_history(){
    return JSON.parse(localStorage.getItem('history'))
}
function reset_local_storage(){
    localStorage.removeItem('obj')
    localStorage.removeItem('history')
}

// function set_player_name(i){

//     localStorage.setItem('name',JSON.stringify(i))


// }
// function get_player_name(){
//     return JSON.parse(localStorage.getItem('name'))
// }
// function set_win_counter(i){
//     localStorage.setItem('win',i)
// }
// function get_win_counter(){
//     return localStorage.getItem('win')
// }

// {
//     first : {
//         name:'',
//         win:0
//     }
// }