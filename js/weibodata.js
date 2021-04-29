let canvas;
let table;
let selectMenu;
let selectMenu2;
let selectMenu3;
let time;
var mood;
let content;
let t
let c
let m
let line
let water;
let timeArray = [];
var moodArray = [];
let contentArray = [];

let imageArray = [];
let vid;
let tfm;

//only call preload once
function preload(){
  table = loadTable('csv/weibo.csv', 'csv', 'header');
  tfm = loadImage('image/tfm.PNG');
  t = loadImage('image/t.png');
  c = loadImage('image/c.png');
  m = loadImage('image/m.png');
  line = loadImage('image/line.png');

  //load the new mood and content files
  contentList = loadStrings("content.txt");
  moodList = loadStrings("mood.txt");
}

// call setup only once
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  //  canvas.id("time");

  imageMode(CENTER);

  //timemenu
  selectMenu = createSelect();
  selectMenu.position(100, 0);
  selectMenu.addClass('select-menu');
  //contentmenu
  selectMenu2 = createSelect();
  selectMenu2.position(windowWidth/2, 0);
  selectMenu2.addClass('select-menu');
  //moodmenu
  selectMenu3 = createSelect();
  selectMenu3.position(windowWidth - 200, 0);
  selectMenu3.addClass('select-menu');
  //noCanvas();

  vid = createVideo(
    ['video/water.mp4'],
    waterLoad
  );

//populate the mood and content menus
for(let i = 0; i < contentList.length; i++){

  selectMenu2.option(contentList[i]);

}

for(let i = 0; i < moodList.length; i++){

  selectMenu3.option(moodList[i]);

}
  for(let i = 0; i < table.getRowCount(); i++){

    time = table.getString(i, 'time');
    selectMenu.option(time);

    // mood = table.getString(i, 'mood');
    // selectMenu3.option(mood);

    timeArray.push(table.getString(i, 'time'));
    moodArray.push(table.getString(i, 'mood'))
    contentArray.push(table.getString(i, 'content'));
    imageArray[i] = loadImage('image/' + table.getString(i, 'image'));
  }


  //when menu is changed, trigger the changeTime function
  selectMenu.changed(changeTime);
  selectMenu2.changed(changecontent);
  selectMenu3.changed(changemood);
}

//change the ourput after you select a time from the drodown menu
function changeTime(){
  clear();
  fill(220,181,113);
  textAlign(CENTER);
  imageMode(CENTER);
  textSize(50);
  for (var i = 0; i < table.getRowCount(); i++){
    if(selectMenu.value() == timeArray[i]){
      text(timeArray[i], 150, 70);
      image(imageArray[i], windowWidth/2, windowHeight/2, 250, 350);
    }
  }

}

//after changing the mood and content menus all of the associated
//items are diplayed on teh screen randomly.
function changecontent(){
  clear();
  fill(248,245,232);
  textAlign(CENTER);
  imageMode(CENTER);
  textSize(50);
  print(selectMenu2.selected());
  let posX = -125;
  let posY = 230;
  text(selectMenu2.selected(), windowWidth/2+40, 70);
  for (var i = 0; i < table.getRowCount(); i++){
    if(selectMenu2.selected() == contentArray[i]){
      posX = posX +270;
      if(posX >= windowWidth - 175){
        posX = -125;
        posY = posY + 310;
      }
          image(imageArray[i], posX, posY, 250, 300);
          // windowWidth/2, windowHeight/2, 250, 350
    }
  }
}


function changemood(){
  clear();
  fill(37,154,161);
  textAlign(CENTER);
  imageMode(CENTER);
    textSize(50);
  let posX = -125;
  let posY = 230;
  text(selectMenu3.selected(), windowWidth - 160, 70);
  for (var i = 0; i < table.getRowCount(); i++){
    if(selectMenu3.selected() == moodArray[i]){
      posX = posX +270;
      if(posX >= windowWidth - 175){
        posX = -125;
        posY = posY + 310;
      }
      image(imageArray[i], posX, posY, 250, 300);

    }
  }
}

//moodmenu end
//call draw only once
// selectMenu.changed()

function draw(){
  image(t,270,30,60,60);
  image(c,860,30,60,60);
  image(m,1400,30,60,60);
  image(line,700,470,1400,670);

}

// This function is called when the video loads

function waterLoad() {
  vid.loop();
}
// videoend
