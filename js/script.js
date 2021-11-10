
class Current_game {
    constructor(div) {
        this.global_box = document.querySelector('.' + div)
        this.current_history_game = 
                                    [
                                        null,
                                        null,
                                        null,
                                          null,
                                        null,
                                        null,
                                        null,
                                        null,
                                        null
                                    ]
            this.step_level = {
                one :[1,3,5,7],
                two:[0,2,6,8],
                three :[4],
            }                        
            this.winCombination = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]],
        this.wide_step=true
        this.data_game = {
            first: {
                name: 'Player1',
                win: 0,

            },
            second: {
                name: 'Player2',
                win: 0
            },
            history: [],
            isCurrent_step: true,
            first_move:true,
            level : null,
            isChange_first_step : false
        }
        
    }
    


    draw_box() {
        this.global_box.innerHTML = this.current_history_game.map((box,index) => `<div id='${index}' class="field">
        
        
        </div>`).join('')
        this.global_box.innerHTML += `
        <div class="container_line_1 cont_line">
        
        <img src="./css/img/line_bg.png" alt="" class="line1 line">
       
       
        <img src="./css/img/line_bg.png" alt="" class="line2 line">
       
        </div>
        <div class="container_line_2 cont_line">
        
        <img src="./css/img/line_bg.png" alt="" class="line1 line">
       
       
        <img src="./css/img/line_bg.png" alt="" class="line2 line">
       
        </div>
        
        <div class='reload_div'>
        <button class=reload_button>
        <img src="./css/img/reload_pic.png" alt="">
        </button>
        </div>

        `
    }


    start_func() {
        this.draw_box()
    }


    start_menu() {
        this.global_box.classList.toggle('start_menu')

    }


    created_input_for_name() {
        this.start_menu()
        this.global_box.innerHTML = `
        <div class='player_cont'>
            <h3>Player1</h3>
            <input type'text' class='player1 player_inp' placeholder='Player 1'>
        </div>
        <div class='player_cont'>
            <h3>Player2</h3>
            <input type'text' class='player2 player_inp' placeholder='Player 2'>
        </div>
        <div class="container_button">
             <button class='start'> Start </button>
            <button class='single_start'>Single start</button>
        </div>

   `
    }


    get_item(...clas) {
        for (const it of clas) {
            this[it] = document.querySelector(`.${it}`)
        }
    }


    closed_style_boxs() {
        this.global_box.style.display = 'none'
    }



    draw_figure(fig) {
        if (fig == 'x') {
            return `
            <img class="original_gif_O" src="./css/img/krestic_anim1.gif" alt="">
            <img class="original_img_O" src="./css/img/krestic1.png" alt="">
                
            `
        }
        if (fig == 'o') {

            return `
            <img class="original_gif_O" src="./css/img/nolik_anim1.gif" alt="">
            <img class="original_img_O" src="./css/img/nolik1.png" alt="">
                
            `
        }


    }

    first_move_change(){
        const o = this.data_game
        this.data_game={...o, first: o.second, second:o.first,isChange_first_step:!o.isChange_first_step   }
        this.data_game.isCurrent_step=!this.data_game.isChange_first_step
    }


    reload_button_click(){
        this.reload_button.onclick=()=>{
            // this.data_game.isCurrent_step=this.data_game.first_move
            // this.data_game.first_move=!this.data_game.first_move
            this.first_move_change()
            set_data_obj(this.data_game)
            
            location.reload()
        }
    }


    reload_active(){
        this.reload_div.style.display='flex'
        this.current_history_game=[null,null,null,null,null,null,null,null,null]
        
        this.reload_button_click()
        
    }


    draw_check(){
        if(this.current_history_game.filter(i=>i).length==9){
            this.reload_active()
            
        }
    }

    win_check(){

    let isWin = false
        
        this.winCombination.forEach((elem)=>{
            const ans =(arg) => this.current_history_game[elem[arg]]
    


            const win = {
                one : ans(0),
                two: ans(1),
                three: ans(2)
            }
            
            if(win.one === win.two && win.one === win.three&& win.one) {
            //    this.data_game.isCurrent_step?this.data_game.first.win++:this.data_game.second.win++ 
                
                if(this.data_game.level){
                    win.one==='x'?this.data_game.first.win++:this.data_game.second.win++ 
                }

                else{
                    if(this.data_game.isChange_first_step){
  
                        win.one==='x'?this.data_game.second.win++:this.data_game.first.win++ 
                    }
                    else{
                        win.one==='x'?this.data_game.first.win++:this.data_game.second.win++ 
                    }
                }
               
                this.draw_win_counter()
                set_data_obj(this.data_game)
                
                this.reload_active()
                isWin=true
            }   
            
        })
       
        this.draw_check()
        return isWin
        
    }



    only_draw_figure(div,fig){
        div.innerHTML = this.draw_figure(fig)
                
        setTimeout(() => {
if( div.children.length ===1) return
            div.children[1].style.opacity = 1
            div.children[0].remove()

        }, fig === 'x'?1200:600)
    }

    draw_figure_complete(div,fig){
                this.only_draw_figure(div,fig)
                    this.current_history_game[div.id]=fig
                    this.wide_step=false
    }




    field_oncl(field) {
        field.onclick = (e) => {
        if(e.target.className !=='field') return
        if(!this.wide_step&&this.data_game.level)return

            let fig=this.data_game.isCurrent_step ? 'x':'o'


            if(this.data_game.level){
                if(!e.target.children[0]){
                         
                    
                    this.draw_figure_complete(e.target,fig)
                    





                        timeout_robot(this)

                        // }
                        
                }
            }



            else{
               
                
                if (!e.target.children[0]) {
                   this.draw_figure_complete(e.target,fig)
                    this.win_check()
                    this.data_game.isCurrent_step= !this.data_game.isCurrent_step

                }
                set_data_history(this.current_history_game)
                set_data_obj(this.data_game)
            }
            
            
        }
    }




    draw_win_counter(){
        this.win_count1.innerHTML=this.data_game.first.win
        this.win_count2.innerHTML=this.data_game.second.win
    }



    set_name(){
        if(this.data_game.first.name&&this.data_game.second.name){
            document.querySelector('.name.p1').textContent=this.data_game.first.name
            
            
                document.querySelector('.name.p2').textContent=this.data_game.second.name
            
        }
        else if(this.data_game.first.name&&this.data_game.level){
            document.querySelector('.name.p1').textContent=this.data_game.first.name
            this.set_CPU_name()
            document.querySelector('.name.p2').textContent=this.data_game.second.name
        }
    
    }

    game_reload(){
        if(get_data_obj){
            this.data_game=get_data_obj()
            this.draw_game()
        }
        else{

        }

    }
    to_main_men_click(){
        this.to_main_men.onclick=()=>{
            reset_local_storage()
            location.reload()
        }
    }
    set_CPU_name(){
        this.data_game.second.name='CPU'
    }
    1
    draw_game(){
        this.start_menu()

        
            this.draw_win_counter()
            this.player_info.classList.add('game_start')
        // }
        


        this.global_box.innerHTML = ''
        this.global_box.classList.add('game_start')
        
        this.start_func()
        this.set_name()
        if(this.data_game.isChange_first_step&&this.data_game.level){
            this.draw_figure_complete(document.getElementById('4'),'x')
            this.current_history_game[4]='x'
            set_data_history(this.current_history_game)
            this.wide_step=true
            this.field_oncl(this.global_box)
        }
        else{
            this.field_oncl(this.global_box)
        }
        this.get_item('reload_div','reload_button')
            

    }
    





    start_click() {
        this.start.onclick = () => {
            
           this.draw_game()
    }
    }
    draw_level_buttons(){
        this.global_box.innerHTML=`
        <button id='easy' class='button_level'>
            Easy
        </button>
        <button id='normal' class='button_level'>
            Normal
        </button>
        <button id='hard' class='button_level'>
            Hard
        </button>
        
        
        `
    }
    



    draw_solo_game(i=()=>{}){
        
        this.player_info.classList.add('game_start')
        this.set_name()
        this.global_box.classList.toggle('choose_level')
        this.global_box.innerHTML = ''
        this.global_box.classList.add('game_start')
        this.start_func()
        if(this.data_game.isChange_first_step){
            this.draw_figure_complete(document.getElementById('4'),'x')

            this.current_history_game[4]='x'
            set_data_history(this.current_history_game)
            this.field_oncl(this.global_box)
        }
        else{
            this.field_oncl(this.global_box)
        }
        this.get_item('reload_div','reload_button')
        this.start_menu()
        
        // robot_start(this.data_game)
        
    }

    button_level_click(){
        for (const i of this.global_box.children) {
            i.onclick=()=>{
                this.data_game.level=i.id
                this.draw_solo_game()
            }
        }  
    }
    choose_level(){
        this.global_box.classList.toggle('choose_level')
        this.global_box.innerHTML=''
        this.draw_level_buttons()
        this.button_level_click()
    }
    solo_start_click(){
        this.single_start.onclick = () => {
            this.choose_level()
     }
    }
    input_name(){
        this.player1.onblur=()=>{
            this.data_game.first.name=this.player1.value
           
        }   
        this.player2.onblur=()=>{
            this.data_game.second.name=this.player2.value
            
        }
    }
    all_event() {
        this.created_input_for_name()
        this.get_item('start','single_start','player1','player2','player_info','win_count1','win_count2','to_main_men')
        this.input_name()
        this.start_click()
        this.solo_start_click()
        this.to_main_men_click()
        
        
    }

}


