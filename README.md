# Lokaverkefni

# 17 jan Fann Ebbu sem leiðbeinanda. Ákvað að nota phaser sem framework og nodejs á bakenda Setti upp express.

# 18 jan  Setti upp game states fyrir leikinnn. boot, game, load, menu, play og win states.
# 		*game - Býr til nýjan Phaser.game og skilgreinig öll state-in. Ræsir svo boot.
# 		*boot - kveikir á physics vélinni
#		*load - preloadar prufumyndum (sprites og spritesheets) og birtir 'loading'.
#   	*menu - Sýnir valmynd. W-takki til að byrja.
#   	*play - Hér á að koma inn virkni, ekki ennþá úfært.
#   	*win - Hér á að koma skjárinn þegar eikur er búinn og á að bjóða upp á menu valmyndina aftur.

# 19 jan Setti upp verkefnið á github.

# 22 jan Fiktaði í Phaser og byrjaði að skoða Box2D physics engine
#        Fékk upp hluti til að snúast og fór að velta fyrir mér farartækinu.

# 23 jan Setti tvö dekk saman við búk og myndaði nokkruskonar bíl. Bætti við gravity og tökkum til þess að keyra fram og til baka.

# 24 jan Fór í að skoða hvernig side-scrolling virkar og hvernig á að útfæra það.

# 25 jan Komast að því að það væri sniðugt að breyta öllum object yfir i prototype og byrjaði á því.
#        Náði að fá side-scrolling til að virka og kláraði að setja upp prototypes og fiktaði í loading screen

# 26 jan Hanna bílinn betur. Stilla hröðun og viðnám við jörðina.

# 29 jan Halda áfram með bílinn.

# 2 feb Setti free cam, Skoðaði hvernig væri best að hanna jörðina.

# 8 feb Gerði braut fyrir bílinn með collision detection út frá vertices.

# 10 mars Náði að hlaða síðunni upp á heroku. Þurfti að nota jade layout engine en ekki ejs html.

# 11 setti center á canvasinn, þurfti að gera block í kringum hann og svo margin: auto