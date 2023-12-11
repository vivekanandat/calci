var postfix = [];
var eq=[];
const waste=[];
let dot=0;
let i=0;
let sign=0;
let l=1;
var dict = {
    '+':1,
    '-':2,
    '*':3,
    '/':4,
};

function notdone(){
    alert("that's not done yet");
}

function display(){
    if(eq[0]){
        document.getElementById('screen').innerHTML= eq[0];
    }
    else{
        document.getElementById('screen').innerHTML= '';
    }
    for (let index = 1; index < i; index++){
        document.getElementById('screen').innerHTML+= eq[index];
    }
}

let str="";
function symbol(str){
    eq[i]=str;
    i++;
    sign=dict[str];
    display();
}

function allclear(){
    eq.length=0;
    i=0;
    document.getElementById('screen').innerHTML= '';
}

function eclear(){
    eq.pop();
    i--;
    display();
}

function num(a){
    if (typeof(eq[i-1])=='number'){
        if(eq[i-1]%1!=0 || dot==1){
            let h=eq[i-1];
            let p=10;
            for (p ; h%1!=0 ; p*=10) {
                h=eq[i-1]*p;
            }
            eq[i-1]=eq[i-1]+(a/p);
        }
        else{
            eq[i-1]=eq[i-1]*10+a;
        }
    }else{
        eq[i]=a;
        i++;
        dot=0;
    }
    display();
}

function decimal(){
    if (typeof(eq[i-1])=='number'){
        if(eq[i-1]%1==0){
        dot=1;
        display();
        document.getElementById('screen').innerHTML+= '.0';
        }
        else{
            document.getElementById('screen').innerHTML='you already have a decimal point';
        }
    }
}

function del(){
    if(eq[i-1].length == 1){
        i--;
    }else{
        eq[i-1]=(eq[i-1]-(eq[i-1]%10))/10;
        if(eq[i-1]==0){
            i--;
        }
    }
    display();
}

function solve_cent(){
    if(typeof(eq[i-1]) == 'number'){
        eq[i-1] = eq[i-1]/100;
        display();
    }
    else{
        document.getElementById('screen').innerHTML = 'nahhh man';
    }
}

function solve_square(){
    if(typeof(eq[i-1]) == 'number'){
        eq[i-1] = eq[i-1]*eq[i-1];
        display();
    }
    else{
        document.getElementById('screen').innerHTML = 'nahhh man';
    }
}

function solve_root(){
    if(typeof(eq[i-1]) == 'number'){
        eq[i-1] = Math.sqrt(eq[i-1]);
        display();
    }
    else{
        document.getElementById('screen').innerHTML = 'nahhh man';
    }
}

function solve_inverse(){
    if(typeof(eq[i-1]) == 'number'){
        eq[i-1] = 1/eq[i-1];
        display();
    }
    else{
        document.getElementById('screen').innerHTML = 'nahhh man';
    }
}

function solve_equal(){
    infixtopostfix();
    solvepostfix();
    document.getElementById('screen').innerHTML  = eq;
    postfix=[];
    i=1;
}

function infixtopostfix(){
    var top = -1;
    var stack = [];
    var precedence = {
        '+': 1,
        '-': 1,
        '*': 2, 
        '/': 2
    };
    for (var i = 0; i < eq.length; i++) {
        if (typeof(eq[i]) == 'number') {
            postfix.push(eq[i]);
        } else {
            if (stack.length == 0) {
                stack.push(eq[i]);
                top++;
            } else {
                if (precedence[eq[i]] > precedence[stack[top]]) {
                    stack.push(eq[i]);
                    top++;
                } else {
                    while (precedence[eq[i]] <= precedence[stack[top]]) {
                        postfix.push(stack.pop());
                        top--;
                        if (top == -1) {
                            break;
                        }
                    }
                    stack.push(eq[i]);
                    top++;
                }
            }
        }
    }
    while(top>-1){
        postfix.push(stack[top]);
        top--;
    }
}

function solvepostfix(){
    var stack = [];
    var top = -1;
    var a, b, c;
    for (var i = 0; i < postfix.length; i++) {
        if (typeof(postfix[i]) == 'number') {
            stack.push(postfix[i]);
            top++;
        } else if (top > 0){
            a = stack.pop();
            top--;
            b = stack.pop();
            top--;
            switch (postfix[i]) {
                case '+':
                    c = b + a;
                    break;
                case '-':
                    c = b - a;
                    break;
                case '*':
                    c = b * a;
                    break;
                case '/':
                    c = b / a;
                    break;
            }
            stack.push(c);
            top++;
        }
    }
    eq = stack;
    i = top + 1;
}
