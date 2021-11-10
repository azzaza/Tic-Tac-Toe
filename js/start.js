
const game_play_class = new Current_game('container_game')
game_play_class.all_event()
if(get_data_obj()){
    game_play_class.game_reload()
}
const arr = get_data_history()
if(arr){
    game_play_class.current_history_game=arr

   arr.map((el,index)=>{
        if(el!=null){
            game_play_class.only_draw_figure(document.getElementById(index),el)
        }
        
    })
}