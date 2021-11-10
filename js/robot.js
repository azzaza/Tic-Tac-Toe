const paint_step =(i,step,fig)=>{
    i.draw_figure_complete(i.global_box.children[step], fig);
            i.current_history_game[step] = fig;
            i.win_check();
            i.wide_step = true;
}
function timeout_robot(i) {
    setTimeout(() => {
        robot_start(i)
        set_data_history(i.current_history_game)
        set_data_obj(i.data_game)
    }, 1200)
}
const robot_start = (i) => {
    if (i.win_check()) return
    let fig = i.data_game.isChange_first_step ? 'x' : 'o'
    switch (i.data_game.level) {
        case 'easy':
            const r = robot_easy(i);
            paint_step(i,r,fig)
            
            break;
            case 'normal':  
            const step =normal(i)
            paint_step(i,step,fig)
            

        break;
        case 'hard': 
        
        const step_h = normal(i)
        const f = hard(i)
       
       const  step_sum=f?f:step_h

        paint_step(i,step_sum,fig)

    }
}
 
function avilable_step(i) {
    let ans = []
    for (let i1 = 0; i1 < i.current_history_game.length; i1++) {
        if (!i.current_history_game[i1]) {
            ans.push(i1)
        }

    }
    return ans
}
function avilable_win_comb(i, figure) {
    const arr_step_win = i.current_history_game
        .map((e, ind) => figure === e ? ind : null)
    .filter(e => (e || e === 0))
    const arr_step_los = i.current_history_game
        .map((e, ind) => (figure == 'x' ? 'o' : 'x') === e ? ind : null)
        .filter(e => (e || e === 0))
        return {
            comp : arr_step_los,
            player : arr_step_win
        }
}    
const arr_win =(arrs,i)=>i.winCombination.map(wins=> {
  const win_arr = arrs.filter(item=>wins.includes(item))

return {
    my_win: win_arr,
    l : win_arr.length,
    win : wins
}}).filter(len=>len.l)
const obj_win_count =arrs=>arrs.map(mas=>{
    let k=0
  
  const b =  mas.filter(elem=>{
      if(i.current_history_game[elem]==null){
          k++ 
          return true
      }
  })
   return {
        win:mas,
        count:k,
        to_win:b
    }

})
const florStep = (arr_step_win,arr_step_los)=>{
    const arr_win_for_comp =arr_win(arr_step_los,arr_step_win)
    const arr_win_for_player = arr_win(arr_step_win,arr_step_los )
    const win_comp_counts=obj_win_count(arr_win_for_comp)
    const win_player_counts=obj_win_count(arr_win_for_player)



    return {
        win_player_counts,
        win_comp_counts
    }

    return florStep(arr_step_win,arr_step_los)
}
const  diferent_step = (player,comp)=>{
    return{
        comp:    comp.filter(el_pl=>{
            if(player.filter(el_cp=>el_cp.win!=el_pl.win)
            .length==player.length){
                   return 1
               }
           }),
        player: player.filter(el_pl=>{
            if(comp.filter(el_cp=>el_cp.win!=el_pl.win )
            .length==comp.length){
                   return 1
               }
           })
    }
   
}
const hard=(i)=>{
    const robot_fig = i.data_game.isChange_first_step ? 'x' : 'o';
    const player_fig = robot_fig === 'o' ? 'x' : 'o';
    let future_step=null
    const all_step =  i.current_history_game
  .map((el,i1)=>el?i1:el)
  .filter(el=>el!==null)
 if(all_step.length>= 3){ //!
    const steps = [[0,4,8], [2,4,6]]
    let count = 0
    let current_win
         steps.forEach(step_win=>{
        count =0
        all_step.forEach(step=>{

            step_win.includes(step) && count++
        })
        if(count===3){
            current_win = all_step
        }
    })
    

    if(i.current_history_game.filter(el=>el||el==0).length==3&&current_win){
        
        if(i.current_history_game[current_win[1]]==robot_fig){
        
        future_step=i.step_level.one[random(i.step_level.one.length)]
    }
    function f_step(){
        future_step=i.step_level.two[random(i.step_level.two.length)]
        if(i.current_history_game[future_step]){
            f_step()
        }
    }
    
     if(i.current_history_game[current_win[1]]==player_fig){
        
        future_step=i.step_level.two[random(i.step_level.two.length)]
        f_step()
    }
   
    }

  
  }
    if(!i.current_history_game[4]){
        future_step=4
    }
    else if(i.current_history_game.filter(el=>el||el==0).length==1){
        future_step=i.step_level.two[random(i.step_level.two.length)]
    }

    return future_step
}
const normal = (i) => {
    const robot_fig = i.data_game.isChange_first_step ? 'x' : 'o';
    const player_fig = robot_fig === 'o' ? 'x' : 'o';
    let future_step=null


const all_data_wins = avilable_win_comb(i, player_fig)

const player = arr_win(all_data_wins.player,i)
const comp = arr_win(all_data_wins.comp,i)
const steps_arr = diferent_step(player,comp)
    //!
steps_arr.comp.map(elem=>{
    if(elem.l==2){
        future_step= elem.win.filter(win=>{
            if(elem.my_win.filter(el=>win!=el).length==2){
                return 1
            }
        })[0]
    }
})

if(future_step==null){
    steps_arr.player.map(elem=>{
        if(elem.l==2){
           future_step= elem.win.filter(win=>{
              if(elem.my_win.filter(el=>win!=el).length==2){
                return 1
              }
            })[0]
        }
    })
}
// {
//!
    //!
     if(!i.current_history_game[4]){
        future_step=4
    }




if(future_step==null) {
    future_step =  robot_easy(i)
} 
return future_step

if(future_step!=null){
    paint_step(i,future_step,robot_fig)
}
    
}

function random(num = 9) {
    return Math.floor(Math.random() * num)

}

function robot_easy(i) {
    const zero_index = i.current_history_game.map((item, index) => !item ? index : null).filter(it => it !== null)
    let r = random(zero_index.length)
    return zero_index[r]

}

