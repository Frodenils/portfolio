    {//===============================  Variables Globales  ===
    var canvas1	= null;	// écran
    var ctx1	= null;	// écran
    var timer1	= null;	// timer frames
    }
    {//==================================  Initialisations  ===
    function body_onLoad ()	{
    //  
    // Initialiser les données du programme
    // Appelé 1 seule fois au début du prog (onload)
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        canvas1 = document.getElementById('canvas1');
        ctx1    = canvas1.getContext('2d');
        canvas1.addEventListener('mousemove', canvas1_MouseMove, false);
        canvas1.addEventListener('click', canvas1_MouseClick, false);

        document.onkeydown = body_OnKeyDown ;
        document.onkeyup = body_OnKeyUp ;
        LeftIsOn = false;
        RightIsOn = false;

        Phase = 'Init';
        start();	// Timer
    }// -------------------------------------------------------
    }
    {//=================================  Gestion du Timer  ===
    function	start()	{ 
        if (timer1 == null)
        timer1 = setInterval('drawFrame()', 1000/30); // timer
    }// -------------------------------------------------------
    function	stop()	{
        if (timer1 != null)
        {
            clearInterval(timer1);
            timer1=null; // est arrété
        }
    }// -------------------------------------------------------
    }
    {//================================  Outils Graphiques  ===
    function	numtocolor	( num )	{
    //
    // Renvoyer la string associée au numéro de couleur
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        switch ( num )
        {	case 0  : return 'black'	;
            case 1  : return 'red'		;
            case 2  : return 'orange'		;
            case 3  : return 'lime'		;
            case 4  : return 'white'	;
            case 5  : return 'yellow'	;
            case 6  : return 'aqua'		;
            case 7  : return 'purple'	;
            default : return 'pink'		;
        }
    }// -------------------------------------------------------
    function	effacer		()				{
    //
    // Effacer le canvas couleur blanche
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      ctx1.beginPath();
      ctx1.fillStyle = 'grey';
      ctx1.fillRect(0,0,ctx1.canvas.width, ctx1.canvas.height);
      ctx1.closePath();
    }// -------------------------------------------------------
    function	cercle		(x,y,r,col)		{     
    //
    // Tracer un cercle
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        ctx1.beginPath();
        ctx1.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx1.fillStyle = col; // Remplissage
        ctx1.fill();               // Tracer Remplissage
        ctx1.lineWidth = 1;
        ctx1.strokeStyle = 'black';
        ctx1.stroke(); // Tracer contour
        ctx1.closePath();
    }// -------------------------------------------------------
    function	rectangle	(x,y,dx,dy,col) {
    //
    // Tracer un rectangle
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        ctx1.beginPath();
        ctx1.fillStyle = col ; // Remplissage
        ctx1.rect(x, y, dx, dy);
        ctx1.fill();
        ctx1.lineWidth = 1;
        ctx1.strokeStyle = 'black';
        ctx1.stroke(); // Tracer contour
        ctx1.closePath();
    }// -------------------------------------------------------
    function	texte	(texte,x,y,col) {
    //
    // Tracer un rectangle
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        ctx1.font = "50px Arial";
        ctx1.fillStyle=col;
        ctx1.strokeStyle = 'black';
        ctx1.fillText(texte,x,y);
        ctx1.strokeText(texte,x,y);
    }// -------------------------------------------------------
    }
    {//=================================  Gestion du Monde  ===
        var Phase = null;
    function	creerLeMonde		()			{
    //
    //  Créer tous les objets du monde
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        
      creerLesBilles();
      creerLesBriques();
      creerLesBonus();
      laRaquette = creerUneRaquette();
    }// -------------------------------------------------------
    function	tracerLeMonde		()			{
    //
    //  Créer tous les objets du monde
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    itererClavier(); //Debug
    
    effacer();

    tracerLesBilles();
    tracerLesBriques();
    tracerUneRaquette(laRaquette);
    tracerLesBonus();
    }// -------------------------------------------------------
    }
    {//===============================  Gestion des Billes  ===
    var nbrBilles = 20 ;		// Nombre de Billes
    var tabBilles = null ;	// tableau des <nbrBilles> billes
    function	creerLesBilles		()			{
    //
    //  Créer tous les objets BILLES du monde
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      tabBilles = new Array();	// nouveau tableau pour les billes
    
      for( var i = 0  ;  i < nbrBilles  ;  i++  )	// créer toutes
        tabBilles[i] = creerUneBille() ;			// les billes
    }// -------------------------------------------------------
    function	creerUneBille		()			{
    //
    //  Créer et Renvoyer une nouvelle bille
    //  Initilisée aléatoirement
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var obj = new Object();			// allouer un nouvel objet
        obj.posX =  50 + Math.random() * 300 ;	// position
        obj.posY = 200 + Math.random() *  50 ;
        obj.vitX = -5 + Math.random() * 10 ;	// vitesse
        obj.vitY = -3 - Math.random() *  3 ;
        obj.rayon=  5 + Math.random() * 15 ;	// rayon
        obj.rayon=  5 ;	// rayon
        obj.color=  Math.floor(Math.random()*8) ;	// num couleur
        obj.color=  numtocolor(obj.color);			// string color
        obj.actif=true;
        return obj ;
    }// -------------------------------------------------------
    function	miseAJourUneBille	( bille )	{
    //
    //  Mettre à jour la <bille> : position vitesse ...
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    if ( ! bille.actif )	return;
        //--- Mettre à jour la position
        bille.posX = bille.posX + bille.vitX ;
        bille.posY = bille.posY + bille.vitY ;
    
        //--- Detecter la sortie du cadre
        if (bille.posX+bille.rayon >= canvas1.width )	bille.vitX = -bille.vitX ;
        if (bille.posY+bille.rayon >= canvas1.height)	bille.actif = false ;
        if (bille.posX-bille.rayon <= 0) 				bille.vitX = -bille.vitX ;
        if (bille.posY-bille.rayon <= 0) 				bille.vitY = -bille.vitY ;
    }// -------------------------------------------------------
    function	miseAJourLesBilles	()			{
    //
    //  Mettre à jour de toutes les billes : position vitesse ...
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
      for( var i = 0  ;  i < nbrBilles  ;  i++  )	// pour toutes les billes
        miseAJourUneBille( tabBilles[i] );
    }// -------------------------------------------------------
    function	tracerUneBille		( bille )	{
    //
    //  Tracer la <bille> à sa position
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        if ( ! bille.actif )	return;
        cercle( bille.posX , bille.posY , bille.rayon , bille.color );
    }// -------------------------------------------------------
    function	tracerLesBilles		()			{
    //
    //  Tracer toutes les billes du tableau de billes
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      for( var i = 0  ;  i < nbrBilles  ;  i++  )	// pour toutes les billes
        tracerUneBille( tabBilles[i] );
    }// -------------------------------------------------------
    }
    {//===============================  Gestion des Bonus  ===
var nbrBonus = 10 ;		// Nombre de Bonus
var tabBonus = null ;	// tableau des <nbrBonus> Bonus
function	creerLesBonus		()			{
//
//  Créer tous les objets BILLES du monde
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  tabBonus = new Array();	// nouveau tableau pour les Bonus
 // nbrBonus= nbrBriques;
if (nbrBonus>nbrBriques) nbrBonus = nbrBriques;

  for( var i = 0  ;  i < nbrBonus  ;  i++  )	// créer toutes
	tabBonus[i] = creerUnBonus() ;			// les Bonus

    for( var i = 0  ;  i < nbrBonus  ;  i++  )	// créer toute
    
    {
        var n = Math.floor(Math.random()*nbrBriques);	// créer toutes
        var brique = tabBriques[n]
        brique.Bonus=tabBonus[i]
        tabBonus[i].posX= brique.posX+(brique.sizeX/2);
        tabBonus[i].posY= brique.posY+(brique.sizeY/2);
    }

}// -------------------------------------------------------
function	creerUnBonus		()			{
//
//  Créer et Renvoyer une nouvelle bille
//  Initilisée aléatoirement
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var obj = new Object();			// allouer un nouvel objet
	obj.posX =  50 + Math.random() * 300 ;	// position
	obj.posY =  50 ;
	obj.vitX =  0;	// vitesse
	obj.vitY = +2;
	obj.rayon=  1000;	// rayon
	obj.rayon=  5;	// rayon
	obj.color=  Math.floor(Math.random()*8) ;	// num couleur
	obj.color=  4;			// string color
	obj.actif=false;
    obj.type = Math.floor(1 + Math.random()*2)
    //obj.type =3;
	return obj ;
}// -------------------------------------------------------
function	miseAJourUnBonus	( Bonus )	{
//
//  Mettre à jour la <bille> : position vitesse ...
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
if ( ! Bonus.actif )	return;
	//--- Mettre à jour la position
	Bonus.posX = Bonus.posX + Bonus.vitX ;
	Bonus.posY = Bonus.posY + Bonus.vitY ;

	//--- Detecter la sortie du cadre
	if (Bonus.posX+Bonus.rayon >= canvas1.width )	Bonus.vitX = -Bonus.vitX ;
	if (Bonus.posY+Bonus.rayon >= canvas1.height)	Bonus.actif = false ;
	if (Bonus.posX-Bonus.rayon <= 0) 				Bonus.vitX = -Bonus.vitX ;
	if (Bonus.posY-Bonus.rayon <= 0) 				Bonus.vitY = -Bonus.vitY ;
}// -------------------------------------------------------
function	miseAJourLesBonus	()			{
//
//  Mettre à jour de toutes les billes : position vitesse ...
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - -


  for( var i = 0  ;  i < nbrBonus  ;  i++  )	// pour toutes les billes
	miseAJourUnBonus( tabBonus[i] );
}// -------------------------------------------------------
function	tracerUnBonus		( Bonus )	{
//
//  Tracer la <bille> à sa position
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	//if ( ! Bonus.actif )	return;
	rectangle( Bonus.posX-Bonus.rayon , Bonus.posY-Bonus.rayon , Bonus.rayon*2 , Bonus.color );
}// -------------------------------------------------------
function	tracerLesBonus		()			{
//
//  Tracer toutes les Bonus du tableau de Bonus
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  for( var i = 0  ;  i < nbrBonus  ;  i++  )	// pour toutes les billes
	tracerUnBonus( tabBonus[i] );
}// -------------------------------------------------------
    }
    {//==============================  Gestion des Briques  ===
    var nbrBriques = 21 ;
    var tabBriques = null ;
    function	creerLesBriques		()			{
    //
    //  Créer tous les objets BILLES du monde
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      tabBriques = new Array();	// nouveau tableau pour les billes
    
      for( var i = 0  ;  i < nbrBriques  ;  i++  )	// créer toutes
        tabBriques[i] = creerUneBrique(i) ;			// les billes
    }// -------------------------------------------------------
    function	creerUneBrique		( num )			{ 
    //
    //  Créer et Renvoyer une nouvelle bille
    //  Initilisée aléatoirement
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var obj = new Object();		// allouer un nouvel objet
        obj.sizeX = 50 ;		// vitesse
        obj.sizeY = 25;
    
        var col = (num % 7 );
        var row = Math.floor(num/7)
            obj.posX = 5 + col * (obj.sizeX+5) ; // Postion X
            obj.posY = 5 + row * (obj.sizeY+5) ; // Postion X
    
    //obj.color=  Math.floor(Math.random()*8) ;// num couleur
        obj.color=  0 ;
        obj.color=  numtocolor(obj.color);		// string color
        obj.actif = true ;			// brique active au début
        obj.cptHits = 0 ;			// nbr de touches
        return obj ;
    }// -------------------------------------------------------
    function	miseAJourUneBrique	( brique )	{
    //
    //  Mettre à jour la <bille> : position vitesse ...
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    }// -------------------------------------------------------
    function	miseAJourLesBriques	()			{
    //
    //  Mettre à jour de toutes les billes : position vitesse ...
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      for( var i = 0  ;  i < nbrBriques  ;  i++  )	// pour toutes les billes
        miseAJourUneBrique( tabBriques[i] );
    }// -------------------------------------------------------
    function	tracerUneBrique		( brique )	{
    //
    //  Tracer la <bille> à sa position
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        if ( ! brique.actif )	return;		// quitter
        
        rectangle(	brique.posX, brique.posY, 
                    brique.sizeX, brique.sizeY ,brique.color );
    }// -------------------------------------------------------
    function	casserLaBrique		(brique)	{
        //
        //  Tracer la <bille> à sa position
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        if( !brique.actif ) return;
        
        brique.actif=false;
        if (brique.Bonus) brique.Bonus.actif = true;
        }// -------------------------------------------------------
    function	casserUneBrique		()	{
        //
        //  Tracer la <bille> à sa position
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        for( var i = 0  ;  i < nbrBriques  ;  i++  )	// pour toutes les billes
        if( tabBriques[i].actif )
        {
            casserLaBrique(tabBriques[i]);
            return;
        }
        }// -------------------------------------------------------

    function	tracerLesBriques	()			{
    //
    //  Tracer toutes les billes du tableau de billes
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      for( var i = 0  ;  i < nbrBriques  ;  i++  )	// pour toutes les billes
        tracerUneBrique( tabBriques[i] );
    }// -------------------------------------------------------
    }
    {//===========================  Gestion de la Raquette  ===
    var laRaquette = null ;
    function	creerUneRaquette		()				{ 
    //
    //  Créer et Renvoyer une nouvelle Raquette
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var obj = new Object();		// allouer un nouvel objet
        obj.sizeX = 70 ;		// 
        obj.sizeY = 15;
        obj.posX = 200 ; // Postion X
        obj.posY = 280 ; // Postion Y fixe
    
        obj.color=  'green';		// string color
        return obj ;
    }// -------------------------------------------------------
    function	miseAJourUneRaquette	( raquette )	{
    //
    //  Mettre à jour la <Raquette> : position vitesse ...
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    }// -------------------------------------------------------
    function	tracerUneRaquette		( raquette )	{
    //
    //  Tracer la <bille> à sa position
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        rectangle(	raquette.posX, raquette.posY, 
                    raquette.sizeX, raquette.sizeY ,raquette.color );
    }// -------------------------------------------------------
    }
    {//==============================  Gestion des Rebonds  ===
    function	billeEstDansBrique				( bille, brique ){
    //
    //Renovyer Vrai si la bille est dans ou sur la brique
    //Faux sinon
    //- - - - - - - -  - - - - - - -  - - - - -  - - - - -  -
        if ( ! brique.actif )	return false;		// quitter
    
        if ((brique.posX <= bille.posX) 
        &&  (bille.posX <= (brique.posX+brique.sizeX))
        &&  (brique.posY <= bille.posY) 
        &&  (bille.posY <= (brique.posY+brique.sizeY)))
              return true;
        else return false ;
    }// -------------------------------------------------------
    function	testerRebondUneBilleUneBrique	( bille, brique ){
    //
    //Tester si bille doit rebondir sur la brique
    //et mettre à jour
    //- - - - - - - -  - - - - - - -  - - - - -  - - - - -  -
        if ( billeEstDansBrique(bille,brique))
        { bille.vitY = -bille.vitY ;	// faire rebondir bille
        
          //--- Gérer la destruction progressive de la brique
          brique.cptHits++ ;
          brique.color = numtocolor(brique.cptHits);
          
          if ( brique.cptHits >= 3 ) casserLaBrique(brique);
        }
    }// -------------------------------------------------------
    function	testerRebondLesBillesLesBriques ()				{
    //
    //  Tester les rebonds de toutes les billes sur toutes les briques
    //- - - - - - - -  - - - - - - -  - - - - -  - - - - -  -
      for( var i = 0  ;  i < nbrBilles   ;  i++  )	// les billes
      for( var j = 0  ;  j < nbrBriques  ;  j++  )	// les briques
        testerRebondUneBilleUneBrique( tabBilles[i] , tabBriques[j] );
    }// -------------------------------------------------------
    function	billeEstDansRaquette			( bille, raquette ){
    //
    //  Renovyer Vrai si la bille est dans ou sur la raquette
    //  Faux sinon
    //- - - - - - - -  - - - - - - -  - - - - -  - - - - -  -
        if ((raquette.posX <= bille.posX) 
        &&  (bille.posX <= (raquette.posX+raquette.sizeX))
        &&  (raquette.posY <= bille.posY) 
        &&  (bille.posY <= (raquette.posY+raquette.sizeY)))
              return true;
        else return false ;
    }// -------------------------------------------------------
    function	BonusEstDansRaquette			( Bonus, raquette ){
        //
        //  Renovyer Vrai si la bille est dans ou sur la raquette
        //  Faux sinon
        //- - - - - - - -  - - - - - - -  - - - - -  - - - - -  -
            if ((raquette.posX <= Bonus.posX) 
            &&  (Bonus.posX <= (raquette.posX+raquette.sizeX))
            &&  (raquette.posY <= Bonus.posY) 
            &&  (Bonus.posY <= (raquette.posY+raquette.sizeY)))
                  return true;
            else return false ;
        }// -------------------------------------------------------
    function	testerRebondUneBilleUneRaquette	( bille, raquette ){
    //
    //  Tester si bille doit rebondir sur la raquette
    //  et mettre à jour
    //- - - - - - - -  - - - - - - -  - - - - -  - - - - -  -
        if ( billeEstDansRaquette(bille,raquette))
    {
        bille.vitY = -bille.vitY ;	// faire rebondir bille
        //...
        tier = raquette.sizeX / 3 ;
    
        if (bille.posX < raquette.posX + tier) 
                bille.vitX -= 2;
        else if  ( bille.posX > raquette.posX + (2*tier)) 
                bille.vitX += 2;
    }
    }// -------------------------------------------------------
    function	testerRebondLesBillesUneRaquette ( raquette )	{
    //
    //  Tester les rebonds de toutes les billes sur la raquette
    //- - - - - - - -  - - - - - - -  - - - - -  - - - - -  -
      for( var i = 0  ;  i < nbrBilles   ;  i++  )	// les billes
        testerRebondUneBilleUneRaquette( tabBilles[i] , raquette );
    }// -------------------------------------------------------
    function	testerContactUnBonusUneRaquette	( Bonus, raquette ){
        //
        //  Tester si bille doit rebondir sur la raquette
        //  et mettre à jour
        //- - - - - - - -  - - - - - - -  - - - - -  - - - - -  -
        if (!Bonus.actif) return;
            if ( BonusEstDansRaquette(Bonus,raquette))
        {
            Bonus.actif=false;
            switch (Bonus.type)
            {
                case 1 : raquette.sizeX +=10; break;
                case 2 : raquette.sizeX -=10; break;
                case 3 : //raquette.sizeY +=10;
                         //raquette.posY -=10;
                         casserUneBrique();
                         break;
            }
        }
        }// -------------------------------------------------------
    function	testerContactLesBonusUneRaquette ( raquette )	{
        //
        //  Tester les rebonds de toutes les billes sur la raquette
        //- - - - - - - -  - - - - - - -  - - - - -  - - - - -  -
          for( var i = 0  ;  i < nbrBonus   ;  i++  )	// les billes
            testerContactUnBonusUneRaquette( tabBonus[i] , raquette );
        }// -------------------------------------------------------
    }
    {//=============================  Gestion de la Partie  ===
    function	nbrBriquesActives ()	{
    //
    //  Renvoyer le nbr de briques encore actives
    //- - - - - - - -  - - - - - - -  - - - - -  - - - - -  -
    var  nbr = 0 ;
    
      for( var i = 0  ;  i < nbrBriques ; i++ )	// les briques
        if ( tabBriques[i].actif )	nbr++ ;
        
      return nbr ;
    }// -------------------------------------------------------
    function	nbrBilleActives ()	{
    //
    //  Renvoyer le nbr de briques encore actives
    //- - - - - - - -  - - - - - - -  - - - - -  - - - - -  -
    var  nbr = 0 ;
    
      for( var i = 0  ;  i < nbrBilles ; i++ )	// les briques
        if ( tabBilles[i].actif )	nbr++ ;
        
      return nbr ;
    }// -------------------------------------------------------
    }
    {//===============================  Gestion des Frames  ===
        var cptFrames = 0;
    function itererPhase_Init () {
        console.log('itererPhase_Init')
        creerLeMonde();
        Phase='Attente';
    }
    function itererPhase_Attente () {
        effacer();
        tracerLesBriques();
        tracerUneRaquette(laRaquette);
        tracerLesBilles();
        texte("Cliquez pour",50,150,'red')
        texte("Commencer",60,200,'red')
    }
    function itererPhase_Jeu () {
        console.log('itererPhase_Jeu')
        //--- Mettre à jour les objets
        miseAJourLesBilles();
        miseAJourLesBriques();
        miseAJourLesBonus();
    
        testerRebondLesBillesLesBriques();
        testerRebondLesBillesUneRaquette(laRaquette);
        testerContactLesBonusUneRaquette(laRaquette);
    
        //-- Afficher les objets
        tracerLeMonde();
    
        //---Tester conditions de sortie
        if ( nbrBriquesActives() == 0 )	Phase ='Gagné';
        if ( nbrBilleActives() == 0 )	Phase ='Perdu';
    }
    function itererPhase_Pause () {
        texte("Cliquez pour",50,150,'Black')
        texte("Reprendre",60,200,'Orange')  
    }
    function itererPhase_Gagne () {
        console.log('itererPhase_Gagne')
        tracerLeMonde();
        texte("Gagné !",50,150,'red')
    }
    function itererPhase_Perdu () {
        console.log('itererPhase_Perdu')
        tracerLeMonde();
        texte("Perdu !",50,150,'red')
    }
    function	drawFrame()	{
    //
    // Retracer l'image courante du monde
    // Appelé 50 fois par seconde
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    document.title= Phase;
    if (Phase == 'Init') itererPhase_Init();
    else if (Phase == 'Attente') itererPhase_Attente();
    else if (Phase == 'Jeu') itererPhase_Jeu();
    else if (Phase == 'Pause') itererPhase_Pause();
    else if (Phase == 'Gagné') itererPhase_Gagne();
    else if (Phase == 'Perdu') itererPhase_Perdu();

    }// -------------------------------------------------------
    }
    {//===========================  Gestion des Evénements  ===
    var  canvas1_MouseMove_cpt = 0 ;	// compteur d'appel à la fnc
    function	canvas1_MouseMove	( event )	{
    //
    // Evènement MouseMove sur le Canvas2
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   /*
    canvas1_MouseMove_cpt++;
      
      var ax = event.offsetX ;		// position absolue de la souris
      var ay = event.offsetY ;
      
        //document.title = 'canvas1_mouseMove '+canvas1_MouseMove_cpt+' '+ax+' '+ay ;
        laRaquette.posX = ax - (laRaquette.sizeX / 2) ;
        
        // ne pas sortir la raquette du cadre
        if(  laRaquette.posX < 5   )	laRaquette.posX = 5 ;
        if(  (laRaquette.posX+laRaquette.sizeX) > 390-5 )
          laRaquette.posX = 390-5-laRaquette.sizeX ;
          */
    }// -------------------------------------------------------
    function canvas1_MouseClick() {
    //
    // Evènement MouseClick sur le Canvas2
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      if (Phase =='Attente') Phase = 'Jeu';
      else if (Phase =='Pause') Phase = 'Jeu';
      else if (Phase =='Gagné') Phase = 'Init';
      else if (Phase =='Perdu') Phase = 'Init';
    }
    }
    {//=======================Gestion Clavier===========
    {//------------------------Touches Virtuelles -----
    var VK_LEFT = 37,
        VK_RIGHT = 39, VK_PAUSE = 35,
        VK_Q = 81, VK_D = 68,
        VK_SPACE =32;

    }    
    var LeftIsOn = false;
    var RightIsOn = false;
        
        function body_OnKeyDown(event){
            //
            //Evenement KeyDown sur la page
            //----------------------------
           document.title=event.keyCode;
            switch (event.keyCode)
            {   case VK_LEFT  : LeftIsOn  = true; break;
                case VK_RIGHT : RightIsOn = true; break;
                case VK_D : RightIsOn = true; break;
                case VK_Q : LeftIsOn = true; break;
                case VK_PAUSE :
                    switch(Phase)
                    {
                        case 'Jeu': Phase = 'Pause'; break;
                        case 'Pause': Phase = 'Jeu'; break;
                    }	
                case VK_SPACE :
                    switch(Phase)
                    {
                        case 'Attente': Phase = 'Jeu'; break;
                        //case 'Jeu': Phase = 'Pause'; break;
                        //case 'Pause': Phase = 'Jeu'; break;
                        case 'Perdu': 
                        case 'Gagné': Phase = 'Init'; break;
                    } break ;
            }

            // ne pas sortir la raquette du cadre
        // if(  laRaquette.posX < 5   )	laRaquette.posX = 5 ;
        // if(  (laRaquette.posX+laRaquette.sizeX) > 390-5 )
        //   laRaquette.posX = 390-5-laRaquette.sizeX ;
        }

        function body_OnKeyUp(event){
            //
            //Evenement KeyDown sur la page
            //----------------------------
            switch (event.keyCode)
            {   case VK_LEFT  : LeftIsOn  = false; break;
                case VK_RIGHT : RightIsOn = false; break;
                case VK_D :     RightIsOn = false; break;
                case VK_Q :      LeftIsOn = false; break;
            }
        }
        function itererClavier(){
        //
        //Déplacer la raquette
        //----------------------------
        if (Phase == 'Pause') return;
        if (LeftIsOn) laRaquette.posX -= 10;
        if (RightIsOn) laRaquette.posX += 10;
        
        // ne pas sortir la raquette du cadre
        if(  laRaquette.posX < 5   )	laRaquette.posX = 5 ;
        if(  (laRaquette.posX+laRaquette.sizeX) > 390-5 )
          laRaquette.posX = 390-5-laRaquette.sizeX ;
        }
    }
    ///////////////////////////////////////////////////////////