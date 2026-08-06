/**
 * Číselník obcí ČR (6 259 obcí) – název | okres | PSČ | lat | lng.
 * Zdroj: veřejná databáze souřadnic a PSČ obcí ČR.
 * Slouží pro našeptávač měst, doplnění PSČ a výpočet vzdálenosti bez závislosti na Google API.
 */

export interface CzCity {
  name: string;
  district: string;
  postalCode: string;
  lat: number;
  lng: number;
}

const RAW = `
Abertamy|Karlovy Vary|36235|50.3689|12.8184
Adamov|České Budějovice|37371|49.0006|14.5396
Adamov|Blansko|67904|49.2957|16.664
Adamov|Kutná Hora|28601|49.8579|15.409
Adršpach|Náchod|54957|50.6244|16.0835
Albrechtice|Karviná|73543|49.7866|18.5245
Albrechtice|Ústí nad Orlicí|56301|49.9276|16.6448
Albrechtice nad Orlicí|Rychnov nad Kněžnou|51722|50.1399|16.0645
Albrechtice nad Vltavou|Písek|39816|49.2533|14.3029
Albrechtice v Jizerských horách|Jablonec nad Nisou|46843|50.7624|15.2758
Albrechtičky|Nový Jičín|74255|49.7018|18.0956
Alojzov|Prostějov|79804|49.4235|17.0416
Andělská Hora|Karlovy Vary|36471|50.2045|12.9629
Andělská Hora|Bruntál|79331|50.0609|17.3892
Anenská Studánka|Ústí nad Orlicí|56301|49.8499|16.5403
Archlebov|Hodonín|69633|49.0437|17.0049
Arneštovice|Pelhřimov|39501|49.5316|15.1179
Arnolec|Jihlava|58827|49.4363|15.8237
Arnoltice|Děčín|40714|50.8371|14.2641
Aš|Cheb|35201|50.224|12.1951
Babice|Prachatice|38411|49.0249|14.2377
Babice|Třebíč|67544|49.1354|15.7706
Babice|Hradec Králové|50351|50.1922|15.5856
Babice|Olomouc|78501|49.7379|17.261
Babice|Praha-východ|25101|50.0081|14.7159
Babice|Uherské Hradiště|68703|49.1239|17.4768
Babice nad Svitavou|Brno-venkov|66401|49.2834|16.6962
Babice u Rosic|Brno-venkov|66484|49.1731|16.3583
Babylon|Domažlice|34401|49.3988|12.8629
Bakov nad Jizerou|Mladá Boleslav|29401|50.4824|14.9416
Baliny|Žďár nad Sázavou|59401|49.3327|15.9525
Balkova Lhota|Tábor|39131|49.4521|14.6083
Bantice|Znojmo|67161|48.8832|16.1825
Banín|Svitavy|56802|49.6657|16.462
Barchov|Hradec Králové|50401|50.1977|15.5677
Barchov|Pardubice|53002|49.9994|15.6809
Barchovice|Kolín|28163|49.9444|14.9692
Bartoušov|Havlíčkův Brod|58001|49.6011|15.6185
Bartošovice|Nový Jičín|74254|49.6689|18.0547
Bartošovice v Orlických horách|Rychnov nad Kněžnou|51761|50.1641|16.5479
Batelov|Jihlava|58851|49.2902|15.4107
Batňovice|Trutnov|54237|50.5177|16.0367
Bavorov|Strakonice|38773|49.122|14.079
Bavory|Břeclav|69201|48.8348|16.6223
Bavoryně|Beroun|26751|49.8959|13.9611
Bačalky|Jičín|50723|50.385|15.1535
Bačetín|Rychnov nad Kněžnou|51801|50.2999|16.2334
Bačice|Třebíč|67555|49.0817|16.0278
Bačkov|Havlíčkův Brod|58291|49.7354|15.4621
Bačkovice|Třebíč|67532|48.9657|15.589
Bařice-Velké Těšany|Kroměříž|76701|49.2455|17.4262
Baška|Frýdek-Místek|73901|49.6459|18.3724
Bašnice|Jičín|50801|50.3346|15.6051
Bašť|Praha-východ|25065|50.2052|14.4774
Bdeněves|Plzeň-sever|33032|49.7696|13.2353
Bdín|Rakovník|27054|50.2142|13.8589
Bechlín|Litoměřice|41186|50.4163|14.341
Bechyně|Tábor|39165|49.2953|14.4682
Bedihošť|Prostějov|79821|49.4484|17.1665
Bednárec|Jindřichův Hradec|37842|49.1953|15.0933
Bednáreček|Jindřichův Hradec|37842|49.2102|15.144
Bedřichov|Blansko|67971|49.4613|16.4654
Bedřichov|Jablonec nad Nisou|46812|50.7912|15.1426
Benecko|Semily|51237|50.6664|15.5483
Benetice|Třebíč|67506|49.2977|15.8674
Benešov|Blansko|67953|49.5095|16.7707
Benešov|Benešov|25601|49.7839|14.6875
Benešov nad Ploučnicí|Děčín|40722|50.7417|14.3125
Benešov nad Černou|Český Krumlov|38282|48.7295|14.6275
Benešov u Semil|Semily|51206|50.6033|15.3685
Benešovice|Tachov|34901|49.727|12.9018
Benátky|Hradec Králové|50303|50.3103|15.7361
Benátky|Svitavy|57001|49.8543|16.3268
Benátky nad Jizerou|Mladá Boleslav|29471|50.2893|14.8246
Bernardov|Kutná Hora|28401|50.0142|15.3987
Bernartice|Písek|39843|49.369|14.3811
Bernartice|Trutnov|54204|50.6448|15.9659
Bernartice|Jeseník|79057|50.3899|17.0784
Bernartice|Benešov|25765|49.6757|15.1292
Bernartice nad Odrou|Nový Jičín|74101|49.6102|17.9479
Beroun|Beroun|26601|49.9673|14.0864
Besednice|Český Krumlov|38281|48.7901|14.557
Bezdružice|Tachov|34953|49.9068|12.9714
Bezdědovice|Strakonice|38801|49.4443|13.8801
Bezděkov|Havlíčkův Brod|58301|49.7329|15.7305
Bezděkov|Pardubice|53501|50.0089|15.6448
Bezděkov|Klatovy|33901|49.3795|13.298
Bezděkov|Rokycany|33824|49.8244|13.5966
Bezděkov nad Metují|Náchod|54964|50.5098|16.2293
Bezděkov pod Třemšínem|Příbram|26242|49.5772|13.8786
Bezděz|Česká Lípa|47201|50.5337|14.7221
Bezděčí u Trnávky|Svitavy|56943|49.6925|16.7635
Bezkov|Znojmo|66902|48.8713|15.9514
Bezměrov|Kroměříž|76701|49.3299|17.3349
Bezno|Mladá Boleslav|29429|50.3674|14.7957
Bezuchov|Přerov|75354|49.4628|17.6089
Bezvěrov|Plzeň-sever|33041|49.9951|13.0591
Bečice|České Budějovice|37501|49.2158|14.5013
Bečice|Tábor|39175|49.3814|14.5398
Bečov|Most|43526|50.4498|13.718
Bečov nad Teplou|Karlovy Vary|36464|50.0836|12.8384
Bečváry|Kolín|28143|49.9568|15.0799
Beňov|Přerov|75002|49.4175|17.5015
Beřovice|Kladno|27371|50.2691|14.1237
Biskoupky|Brno-venkov|66491|49.0978|16.2814
Biskupice|Prostějov|79812|49.4598|17.2367
Biskupice|Chrudim|53843|49.8729|15.5129
Biskupice|Svitavy|56943|49.6476|16.7581
Biskupice|Zlín|76341|49.0832|17.7105
Biskupice-Pulkov|Třebíč|67558|49.0383|16.0096
Bitozeves|Louny|44001|50.3733|13.6408
Biřkov|Klatovy|33401|49.5182|13.2303
Blanné|Znojmo|67154|48.992|15.8833
Blansko|Blansko|67801|49.365|16.6479
Blatce|Česká Lípa|47201|50.503|14.6033
Blatec|Olomouc|78375|49.5284|17.2387
Blatnice|Třebíč|67551|49.0702|15.8714
Blatnice|Plzeň-sever|33025|49.7198|13.1561
Blatnice pod Svatým Antonínkem|Hodonín|69671|48.9468|17.4661
Blatnička|Hodonín|69671|48.9356|17.5302
Blatno|Chomutov|43001|50.5118|13.3582
Blatno|Louny|43984|50.097|13.3898
Blatná|Strakonice|38801|49.425|13.8819
Blazice|Kroměříž|76861|49.4426|17.6454
Blažejov|Jindřichův Hradec|37852|49.1423|15.0966
Blažejovice|Benešov|25768|49.6199|15.2
Blažim|Plzeň-sever|33038|49.916|13.0477
Blažim|Louny|44001|50.407|13.6287
Blažkov|Žďár nad Sázavou|59251|49.4732|16.1853
Blažovice|Brno-venkov|66408|49.1658|16.7862
Blevice|Kladno|27328|50.2098|14.2363
Blešno|Hradec Králové|50346|50.214|15.9307
Blovice|Plzeň-jih|33601|49.5823|13.5402
Bludov|Šumperk|78961|49.9411|16.9281
Bludov|Kutná Hora|28601|49.8076|15.2553
Blučina|Brno-venkov|66456|49.0551|16.6446
Blízkov|Žďár nad Sázavou|59442|49.4006|15.9088
Blížejov|Domažlice|34545|49.5001|12.9894
Blíževedly|Česká Lípa|47104|50.6085|14.3966
Blížkovice|Znojmo|67155|48.9999|15.8349
Blšany|Louny|43988|50.2174|13.4713
Blšany u Loun|Louny|44001|50.3471|13.8528
Bobnice|Nymburk|28931|50.2197|15.0536
Bobrová|Žďár nad Sázavou|59255|49.4824|16.1184
Bobrůvka|Žďár nad Sázavou|59255|49.4487|16.0939
Bocanovice|Frýdek-Místek|73991|49.5692|18.7385
Bochov|Karlovy Vary|36471|50.151|13.0453
Bochovice|Třebíč|67505|49.3209|15.8964
Bochoř|Přerov|75002|49.4215|17.4285
Boharyně|Hradec Králové|50323|50.2039|15.631
Bohatice|Česká Lípa|47002|50.669|14.6794
Bohaté Málkovice|Vyškov|68501|49.1891|17.0143
Bohdalec|Žďár nad Sázavou|59255|49.4744|16.0599
Bohdalice-Pavlovice|Vyškov|68341|49.2141|17.0302
Bohdalov|Žďár nad Sázavou|59213|49.4808|15.8765
Bohdalovice|Český Krumlov|38101|48.7429|14.2869
Bohdalín|Pelhřimov|39491|49.3078|15.0159
Bohdaneč|Kutná Hora|28525|49.7783|15.2227
Bohdašín|Rychnov nad Kněžnou|51801|50.3386|16.2252
Bohdíkov|Šumperk|78964|50.0101|16.9044
Bohostice|Příbram|26231|49.6022|14.1382
Bohumilice|Prachatice|38481|49.0962|13.8164
Bohumín|Karviná|73581|49.9044|18.3571
Bohunice|Prachatice|38422|49.1325|13.9733
Bohuslavice|Jihlava|58856|49.1495|15.5759
Bohuslavice|Náchod|54906|50.3127|16.0887
Bohuslavice|Opava|74719|49.9424|18.1288
Bohuslavice|Prostějov|79856|49.621|16.9577
Bohuslavice|Šumperk|78972|49.8262|16.9406
Bohuslavice nad Vláří|Zlín|76321|49.0903|17.9264
Bohuslavice u Zlína|Zlín|76351|49.1632|17.6369
Bohuslávky|Přerov|75131|49.5553|17.5679
Bohutice|Znojmo|67176|48.9914|16.3577
Bohutín|Šumperk|78962|49.9536|16.882
Bohutín|Příbram|26241|49.6556|13.944
Bohuňov|Žďár nad Sázavou|59301|49.5605|16.2025
Bohuňov|Svitavy|56904|49.5992|16.464
Bohuňovice|Olomouc|78314|49.6631|17.287
Bohuňovice|Svitavy|57001|49.908|16.263
Bohušice|Třebíč|67551|49.0852|15.8522
Bohušov|Bruntál|79399|50.2434|17.714
Bohušovice nad Ohří|Litoměřice|41156|50.4933|14.1506
Bohy|Plzeň-sever|33141|49.9379|13.5755
Boháňka|Jičín|50801|50.3659|15.7085
Bojanov|Chrudim|53826|49.8414|15.705
Bojanovice|Znojmo|67153|48.9683|15.9892
Bojanovice|Praha-západ|25206|49.8545|14.3521
Bojiště|Havlíčkův Brod|58401|49.6679|15.2869
Bojkovice|Uherské Hradiště|68771|49.0387|17.815
Bolatice|Opava|74723|49.9518|18.0837
Boleboř|Chomutov|43121|50.5403|13.4134
Bolehošť|Rychnov nad Kněžnou|51731|50.2137|16.0771
Boleradice|Břeclav|69112|48.9668|16.814
Boletice (vojenský újezd)|Český Krumlov|38229|48.825|14.2174
Bolešiny|Klatovy|33901|49.41|13.3617
Bolkov|Plzeň-jih|33401|49.5337|13.224
Bor|Tachov|34802|49.7117|12.7753
Bor u Skutče|Chrudim|53944|49.8224|16.1271
Borač|Brno-venkov|59261|49.4009|16.3612
Bordovice|Nový Jičín|74401|49.547|18.1527
Borek|České Budějovice|37367|49.0235|14.501
Borek|Havlíčkův Brod|58282|49.7919|15.5901
Borek|Jičín|50771|50.439|15.6543
Borek|Pardubice|53401|50.1273|15.8566
Borek|Praha-východ|27714|50.2227|14.6475
Boreč|Mladá Boleslav|29426|50.4075|14.7325
Borkovany|Břeclav|69175|49.0283|16.8102
Borkovice|Tábor|39181|49.208|14.6435
Borohrádek|Rychnov nad Kněžnou|51724|50.0979|16.0934
Borotice|Znojmo|67178|48.8574|16.2427
Borotice|Příbram|26215|49.7351|14.2798
Borotín|Tábor|39135|49.5051|14.6131
Borotín|Blansko|67937|49.5814|16.6716
Borovany|České Budějovice|37312|48.8987|14.6424
Borovany|Písek|39843|49.3431|14.3926
Borovnice|České Budějovice|37007|48.9122|14.5191
Borovnice|Žďár nad Sázavou|59242|49.6673|16.2027
Borovnice|Rychnov nad Kněžnou|51741|50.063|16.2454
Borovnice|Trutnov|54477|50.5093|15.6173
Borovnice|Benešov|25765|49.6488|15.0184
Borovnička|Trutnov|54475|50.501|15.6673
Borovno|Plzeň-jih|33561|49.6221|13.6905
Borovná|Jihlava|58856|49.1647|15.3947
Borovník|Brno-venkov|59451|49.3557|16.2295
Borovy|Plzeň-jih|33401|49.5252|13.3024
Borová|Náchod|54701|50.3861|16.2533
Borová|Svitavy|56982|49.7418|16.1623
Borová Lada|Prachatice|38492|48.9899|13.66
Borušov|Svitavy|57101|49.7807|16.7406
Bory|Žďár nad Sázavou|59461|49.4259|16.0263
Boršice|Uherské Hradiště|68709|49.0626|17.351
Boršice u Blatnice|Uherské Hradiště|68763|48.935|17.5711
Boršov|Jihlava|58805|49.404|15.4343
Boršov nad Vltavou|České Budějovice|37382|48.9219|14.4341
Boseň|Mladá Boleslav|29501|50.5042|15.0229
Boskovice|Blansko|68001|49.4876|16.6601
Boskovštejn|Znojmo|67154|48.9828|15.9297
Boudy|Písek|39804|49.4481|14.0356
Bousov|Chrudim|53843|49.9018|15.5355
Bousín|Prostějov|79861|49.4552|16.8898
Bouzov|Olomouc|78325|49.7044|16.893
Bozkov|Semily|51213|50.6402|15.3372
Boňkov|Havlíčkův Brod|58255|49.5472|15.4476
Bořanovice|Praha-východ|25065|50.1783|14.4789
Bořenovice|Kroměříž|76901|49.3616|17.5645
Bořetice|Břeclav|69108|48.9131|16.8532
Bořetice|Pelhřimov|39501|49.4962|15.11
Bořetín|Jindřichův Hradec|37853|49.1893|15.2119
Bořetín|Pelhřimov|39470|49.3102|14.9477
Bořice|Chrudim|53862|49.977|15.9254
Bořislav|Teplice|41501|50.5795|13.9293
Bořitov|Blansko|67921|49.4251|16.5913
Bošice|Prachatice|38481|49.0894|13.8404
Bošilec|České Budějovice|37365|49.1494|14.6463
Bošovice|Vyškov|68354|49.0536|16.8369
Bošín|Ústí nad Orlicí|56501|50.0342|16.2031
Božanov|Náchod|54974|50.5269|16.3654
Božejov|Pelhřimov|39461|49.3622|15.1559
Božetice|Písek|39901|49.4512|14.444
Božice|Znojmo|67164|48.837|16.2889
Božičany|Karlovy Vary|36225|50.2588|12.7698
Boží Dar|Karlovy Vary|36301|50.4098|12.9246
Brada-Rybníček|Jičín|50601|50.4653|15.3376
Bradlec|Mladá Boleslav|29306|50.4515|14.9103
Bradlecká Lhota|Semily|50713|50.4887|15.3963
Bradáčov|Tábor|39143|49.4909|14.8715
Brambory|Kutná Hora|28601|49.9783|15.4703
Brandov|Most|43547|50.6321|13.3908
Brandýs nad Labem - Stará Boleslav|Praha-východ|25001|50.1864|14.6593
Brandýs nad Orlicí|Ústí nad Orlicí|56112|50.002|16.2854
Brandýsek|Kladno|27341|50.1893|14.1621
Branice|Písek|39843|49.4026|14.3396
Branišov|České Budějovice|37384|48.9788|14.3958
Branišovice|Brno-venkov|67177|48.9629|16.432
Branka u Opavy|Opava|74741|49.8881|17.8828
Brankovice|Vyškov|68333|49.1561|17.1349
Branky|Vsetín|75645|49.4611|17.8931
Branná|Šumperk|78825|50.1534|17.012
Branov|Rakovník|27023|50.013|13.843
Bransouze|Třebíč|67521|49.3028|15.7519
Brantice|Bruntál|79393|50.0636|17.6292
Braníškov|Brno-venkov|66471|49.2945|16.3458
Branžež|Mladá Boleslav|29402|50.5077|15.058
Bratkovice|Příbram|26223|49.7405|13.999
Bratronice|Strakonice|38801|49.3654|13.8425
Bratronice|Kladno|27363|50.0679|14.0143
Bratrušov|Šumperk|78701|50.0095|16.949
Bratčice|Brno-venkov|66467|49.0652|16.5232
Bratčice|Kutná Hora|28601|49.8553|15.4305
Bratřejov|Zlín|76312|49.2226|17.9134
Bratřice|Pelhřimov|39501|49.5166|15.0013
Bratříkovice|Opava|74752|49.9327|17.6876
Bratřínov|Praha-západ|25205|49.8427|14.3402
Bravantice|Nový Jičín|74281|49.7572|18.0829
Braňany|Most|43522|50.5431|13.7003
Braškov|Kladno|27351|50.1021|14.1009
Bražec|Karlovy Vary|36471|50.1727|13.0466
Brdy (vojenský újezd)|Příbram|26223|49.7893|13.9032
Brloh|Český Krumlov|38206|48.93|14.2187
Brloh|Pardubice|53501|50.0007|15.5574
Brniště|Česká Lípa|47129|50.7293|14.7035
Brno|Brno-město|60200|49.1952|16.6069
Brníčko|Šumperk|78975|49.895|16.9683
Brnířov|Domažlice|34506|49.3827|13.0497
Brněnec|Svitavy|56904|49.6274|16.5221
Brod nad Dyjí|Břeclav|69181|48.8753|16.5355
Brod nad Tichou|Tachov|34815|49.8354|12.7412
Brodce|Mladá Boleslav|29473|50.3308|14.8693
Brodec|Louny|44001|50.295|13.8017
Brodek u Konice|Prostějov|79846|49.5488|16.833
Brodek u Prostějova|Prostějov|79807|49.3701|17.0902
Brodek u Přerova|Přerov|75103|49.4843|17.3384
Brodeslavy|Plzeň-sever|33141|49.9538|13.5571
Broumov|Náchod|55001|50.5858|16.3319
Broumov|Tachov|34815|49.8895|12.6068
Broumy|Beroun|26742|49.9552|13.8524
Brozany nad Ohří|Litoměřice|41181|50.4538|14.1455
Brtnice|Jihlava|58832|49.307|15.6765
Brtnička|Jihlava|67527|49.2373|15.6243
Brumov|Brno-venkov|67923|49.4625|16.4259
Brumov-Bylnice|Zlín|76331|49.0925|18.0228
Brumovice|Břeclav|69111|48.9609|16.8963
Brumovice|Opava|74771|50.0154|17.7497
Bruntál|Bruntál|79201|49.9883|17.4638
Brusné|Kroměříž|76861|49.3634|17.6608
Bruzovice|Frýdek-Místek|73936|49.7171|18.4097
Brušperk|Frýdek-Místek|73944|49.7002|18.2222
Brzice|Náchod|55205|50.4445|15.9584
Brzkov|Jihlava|58813|49.5261|15.7272
Brzánky|Litoměřice|41301|50.4619|14.3013
Brázdim|Praha-východ|25063|50.1836|14.5883
Brňany|Litoměřice|41201|50.4811|14.142
Brťov-Jeneč|Blansko|67921|49.4138|16.5171
Bublava|Sokolov|35801|50.3745|12.5053
Bubovice|Beroun|26718|49.9698|14.1666
Buchlovice|Uherské Hradiště|68708|49.0864|17.3386
Budeč|Jindřichův Hradec|37892|49.0873|15.59
Budeč|Žďár nad Sázavou|59214|49.5365|15.9124
Budiměřice|Nymburk|28802|50.1954|15.0989
Budislav|Tábor|39201|49.2939|14.8375
Budislav|Svitavy|56965|49.8015|16.1747
Budišov|Třebíč|67503|49.2715|16.0039
Budišov nad Budišovkou|Opava|74787|49.7952|17.6298
Budišovice|Opava|74764|49.8614|18.0397
Budkov|Prachatice|38422|49.0702|14.0071
Budkov|Třebíč|67542|49.0546|15.659
Budyně|Strakonice|38773|49.1461|14.0712
Budyně nad Ohří|Litoměřice|41118|50.4044|14.126
Budíkov|Pelhřimov|39601|49.5792|15.3627
Budíškovice|Jindřichův Hradec|37891|49.0763|15.531
Budčeves|Jičín|50732|50.3086|15.2546
Budětice|Klatovy|34201|49.2835|13.5848
Budětsko|Prostějov|79852|49.5871|16.927
Bujanov|Český Krumlov|38241|48.7024|14.4297
Bujesily|Rokycany|33141|49.9147|13.5745
Buk|Prachatice|38301|49.038|13.8452
Buk|Přerov|75121|49.5045|17.4688
Bukov|Žďár nad Sázavou|59251|49.4544|16.2237
Bukovany|Hodonín|69631|49.0423|17.101
Bukovany|Sokolov|35755|50.1664|12.5728
Bukovany|Olomouc|77900|49.6054|17.3436
Bukovany|Benešov|25741|49.8229|14.6244
Bukovany|Příbram|26272|49.5746|14.1026
Bukovec|Frýdek-Místek|73984|49.5567|18.8216
Bukovec|Domažlice|34562|49.5865|12.9954
Bukovice|Brno-venkov|67923|49.4068|16.4898
Bukovice|Náchod|54954|50.5496|16.228
Bukovina|Blansko|67905|49.2976|16.7733
Bukovina nad Labem|Pardubice|53352|50.125|15.8234
Bukovina u Přelouče|Pardubice|53501|49.9483|15.563
Bukovina u Čisté|Semily|51401|50.5427|15.5839
Bukovinka|Blansko|67905|49.2943|16.805
Bukovka|Pardubice|53341|50.1011|15.6254
Bukovno|Mladá Boleslav|29301|50.4469|14.8407
Bukovník|Klatovy|34201|49.2226|13.6614
Buková|Prostějov|79848|49.5098|16.8292
Buková|Plzeň-jih|33452|49.5375|13.1589
Buková u Příbramě|Příbram|26223|49.7552|14.0667
Bukvice|Jičín|50601|50.4126|15.2946
Bulhary|Břeclav|69189|48.8316|16.7488
Bulovka|Liberec|46401|50.9712|15.1237
Butoves|Jičín|50601|50.3866|15.4275
Buzice|Strakonice|38801|49.4227|13.9327
Bučina|Ústí nad Orlicí|56601|49.897|16.1929
Bučovice|Vyškov|68501|49.1494|17.004
Bučí|Plzeň-sever|33152|49.8853|13.3029
Buřenice|Pelhřimov|39501|49.5528|15.0663
Buš|Praha-západ|25208|49.8034|14.384
Bušanovice|Prachatice|38422|49.1155|13.9348
Bušovice|Rokycany|33824|49.7956|13.5348
Buštěhrad|Kladno|27343|50.156|14.1891
Bušín|Šumperk|78962|49.9762|16.838
Bykoš|Beroun|26701|49.8831|14.0638
Bylany|Chrudim|53801|49.9574|15.7333
Bynovec|Děčín|40502|50.8209|14.2643
Bystrovany|Olomouc|77900|49.5971|17.3238
Bystročice|Olomouc|77900|49.5363|17.1936
Bystrá|Pelhřimov|39601|49.5086|15.3713
Bystrá nad Jizerou|Semily|51301|50.6048|15.402
Bystré|Rychnov nad Kněžnou|51801|50.3216|16.2553
Bystré|Svitavy|56992|49.6286|16.3469
Bystřany|Teplice|41761|50.6288|13.8643
Bystřec|Ústí nad Orlicí|56154|50.0118|16.6191
Bystřice|Jičín|50723|50.393|15.2442
Bystřice|Frýdek-Místek|73995|49.6367|18.7205
Bystřice|Benešov|25751|49.7322|14.6675
Bystřice nad Pernštejnem|Žďár nad Sázavou|59301|49.523|16.2616
Bystřice pod Hostýnem|Kroměříž|76861|49.3993|17.6741
Bystřice pod Lopeníkem|Uherské Hradiště|68755|48.9749|17.7642
Bystřička|Vsetín|75624|49.4154|17.9741
Byzhradec|Rychnov nad Kněžnou|51801|50.2159|16.1903
Byšice|Mělník|27732|50.3105|14.6115
Bzenec|Hodonín|69681|48.9735|17.267
Bzová|Beroun|26743|49.898|13.8625
Bácovice|Pelhřimov|39301|49.4558|15.1581
Bánov|Uherské Hradiště|68754|48.9881|17.7176
Báňovice|Jindřichův Hradec|38001|49.0119|15.4903
Bílence|Chomutov|43001|50.4247|13.506
Bílichov|Kladno|27374|50.2622|13.9165
Bílina|Teplice|41801|50.5486|13.7755
Bílkovice|Benešov|25726|49.7598|14.8611
Bílov|Nový Jičín|74301|49.7342|18.0017
Bílov|Plzeň-sever|33141|50.018|13.425
Bílovec|Nový Jičín|74301|49.7565|18.0159
Bílovice|Uherské Hradiště|68712|49.0997|17.5497
Bílovice nad Svitavou|Brno-venkov|66401|49.2472|16.6726
Bílovice-Lutotín|Prostějov|79841|49.5111|17.0433
Bílsko|Strakonice|38773|49.1591|14.0591
Bílsko|Olomouc|78322|49.6447|17.0198
Bílsko u Hořic|Jičín|50801|50.3695|15.6006
Bílá|Liberec|46343|50.6649|15.0355
Bílá|Frýdek-Místek|73915|49.4422|18.453
Bílá Hlína|Mladá Boleslav|29501|50.5326|14.9254
Bílá Lhota|Olomouc|78321|49.7096|16.9752
Bílá Třemešná|Trutnov|54472|50.4447|15.7411
Bílá Voda|Jeseník|79069|50.4421|16.9165
Bílé Podolí|Kutná Hora|28572|49.9566|15.4911
Bílé Poličany|Trutnov|54452|50.3909|15.732
Bílý Kostel nad Nisou|Liberec|46331|50.8232|14.9245
Bílý Kámen|Jihlava|58841|49.4174|15.5602
Bílý Potok|Liberec|46362|50.8738|15.2222
Bílý Újezd|Rychnov nad Kněžnou|51801|50.2385|16.2254
Bílčice|Bruntál|79368|49.8697|17.5656
Bítouchov|Mladá Boleslav|29401|50.4759|14.8895
Bítov|Znojmo|67110|48.9364|15.7291
Bítov|Nový Jičín|74301|49.8004|18.0476
Bítovany|Chrudim|53851|49.8973|15.8647
Bítovčice|Jihlava|58822|49.3681|15.7342
Býchory|Kolín|28002|50.0677|15.2736
Býkev|Mělník|27601|50.3473|14.4181
Býkov-Láryšov|Bruntál|79401|50.0524|17.6875
Býkovice|Blansko|67971|49.4303|16.5384
Býčkovice|Litoměřice|41201|50.5599|14.2136
Býškovice|Přerov|75353|49.4676|17.7142
Býšovec|Žďár nad Sázavou|59301|49.4753|16.2894
Býšť|Pardubice|53322|50.1325|15.9113
Běchary|Jičín|50732|50.3141|15.2926
Běhařov|Klatovy|34021|49.3449|13.1603
Běhařovice|Znojmo|67139|49.004|16.0787
Běleč|Tábor|39143|49.5438|14.8374
Běleč|Brno-venkov|67923|49.434|16.3832
Běleč|Kladno|27363|50.0563|13.9931
Běleč nad Orlicí|Hradec Králové|50346|50.1981|15.9428
Bělkovice-Lašťany|Olomouc|78316|49.6688|17.3173
Běloky|Kladno|27353|50.1315|14.2209
Bělotín|Přerov|75364|49.5913|17.8066
Bělov|Zlín|76821|49.2161|17.4849
Bělušice|Kolín|28002|50.0692|15.322
Bělušice|Most|43401|50.4493|13.7629
Bělá|Havlíčkův Brod|58401|49.7545|15.2407
Bělá|Pelhřimov|39301|49.3126|15.2607
Bělá|Semily|51401|50.5344|15.4454
Bělá|Opava|74723|49.9724|18.145
Bělá nad Radbuzou|Domažlice|34526|49.5913|12.7177
Bělá nad Svitavou|Svitavy|56905|49.6403|16.4827
Bělá pod Bezdězem|Mladá Boleslav|29421|50.5013|14.8043
Bělá pod Pradědem|Jeseník|79001|50.164|17.1967
Bělá u Jevíčka|Svitavy|56943|49.6396|16.646
Bělčice|Strakonice|38743|49.5025|13.8759
Běrunice|Nymburk|28908|50.1858|15.3337
Běstovice|Ústí nad Orlicí|56501|50.0202|16.211
Běstvina|Chrudim|53845|49.8371|15.5959
Běšiny|Klatovy|33901|49.3017|13.3127
Běštín|Beroun|26724|49.8074|14.0163
Břasy|Rokycany|33824|49.8371|13.5784
Břeclav|Břeclav|69002|48.7532|16.8826
Břehov|České Budějovice|37341|49.0224|14.3307
Břehy|Pardubice|53501|50.052|15.5776
Břest|Kroměříž|76823|49.3512|17.4408
Břestek|Uherské Hradiště|68708|49.095|17.356
Břevnice|Havlíčkův Brod|58001|49.6314|15.6127
Březejc|Žďár nad Sázavou|59401|49.3464|16.0916
Březina|Jindřichův Hradec|37821|49.2906|14.9098
Březina|Jičín|50601|50.4344|15.3134
Březina|Svitavy|56923|49.651|16.6197
Březina|Rokycany|33824|49.8076|13.5969
Březina|Mladá Boleslav|29411|50.5486|15.0329
Březina|Brno-venkov|67905|49.2822|16.7552
Březina|Brno-venkov|66601|49.2817|16.7496
Březina (vojenský újezd)|Vyškov|79805|49.3682|16.9609
Březinky|Svitavy|56943|49.6628|16.787
Březiny|Svitavy|57201|49.6907|16.1182
Březnice|Tábor|39171|49.2519|14.5141
Březnice|Příbram|26272|49.5577|13.9507
Březnice|Zlín|76001|49.185|17.6567
Březno|Mladá Boleslav|29406|50.4063|15.0056
Březno|Chomutov|43145|50.4023|13.4209
Březník|Třebíč|67574|49.1722|16.1942
Březolupy|Uherské Hradiště|68713|49.1215|17.5805
Březovice|Mladá Boleslav|29424|50.4708|14.7337
Březová|Karlovy Vary|36001|50.1975|12.871
Březová|Sokolov|35601|50.1458|12.6435
Březová|Opava|74744|49.7917|17.8657
Březová|Beroun|26751|49.9042|13.8831
Březová|Uherské Hradiště|68767|48.9222|17.7428
Březová|Zlín|76315|48.9233|17.7412
Březová nad Svitavou|Svitavy|56902|49.6443|16.5181
Březová-Oleško|Praha-západ|25245|49.9041|14.411
Březsko|Prostějov|79852|49.6087|16.8925
Březské|Žďár nad Sázavou|59453|49.33|16.2383
Březí|Strakonice|26242|49.5079|13.7976
Březí|Břeclav|69181|48.8194|16.5676
Březí|Žďár nad Sázavou|59453|49.3433|16.216
Březí|Praha-východ|25101|50.0148|14.6994
Březí nad Oslavou|Žďár nad Sázavou|59214|49.503|15.9357
Březůvky|Zlín|76345|49.1534|17.6997
Břežany|Znojmo|67165|48.87|16.3419
Břežany|Klatovy|34101|49.3489|13.6175
Břežany|Rakovník|27034|50.007|13.5829
Břežany I|Kolín|28002|50.035|15.0791
Břežany II|Kolín|28201|50.0939|14.8044
Břidličná|Bruntál|79351|49.9118|17.3712
Břvany|Louny|44001|50.4013|13.7216
Bříství|Nymburk|28915|50.134|14.8418
Bříza|Litoměřice|41301|50.3606|14.2164
Bříšťany|Jičín|50801|50.3163|15.6209
Bžany|Teplice|41501|50.5892|13.8796
Cebiv|Tachov|34952|49.8294|12.9792
Cehnice|Strakonice|38752|49.2152|14.0295
Cejle|Jihlava|58851|49.3694|15.4729
Cekov|Rokycany|33808|49.822|13.7639
Cep|Jindřichův Hradec|37901|48.9196|14.8075
Cerekvice nad Bystřicí|Jičín|50777|50.3333|15.7236
Cerekvice nad Loučnou|Svitavy|56953|49.899|16.2153
Cerekvička-Rosice|Jihlava|58833|49.3349|15.5873
Cerhenice|Kolín|28102|50.0714|15.0721
Cerhonice|Písek|39804|49.4181|14.0557
Cerhovice|Beroun|26761|49.8496|13.8349
Cetechovice|Kroměříž|76802|49.1724|17.2615
Cetenov|Liberec|46348|50.6445|14.9177
Cetkovice|Blansko|67938|49.5789|16.7214
Cetoraz|Pelhřimov|39411|49.4553|14.9574
Cetyně|Příbram|26231|49.5997|14.1215
Chabařovice|Ústí nad Labem|40317|50.6733|13.942
Chabeřice|Kutná Hora|28522|49.7502|15.0739
Chaloupky|Beroun|26762|49.792|13.8685
Chanovice|Klatovy|34101|49.405|13.7175
Charvatce|Mladá Boleslav|29445|50.3227|14.9987
Charváty|Olomouc|78375|49.5185|17.2541
Chbany|Chomutov|43157|50.3329|13.4305
Cheb|Cheb|35002|50.0796|12.37
Chelčice|Strakonice|38901|49.1219|14.1692
Cheznovice|Rokycany|33806|49.779|13.7855
Chlebičov|Opava|74731|49.9595|17.9676
Chleby|Benešov|25741|49.8271|14.557
Chleby|Nymburk|28931|50.2229|15.0895
Chleny|Rychnov nad Kněžnou|51745|50.078|16.2438
Chlistov|Klatovy|33901|49.32|13.361
Chlum|Strakonice|38801|49.4473|13.8512
Chlum|Třebíč|67507|49.3135|15.7672
Chlum|Česká Lípa|47201|50.5785|14.5628
Chlum|Plzeň-jih|33204|49.6053|13.4793
Chlum|Rokycany|33808|49.9358|13.6598
Chlum|Benešov|25763|49.6931|14.9959
Chlum Svaté Maří|Sokolov|35709|50.1499|12.5358
Chlum u Třeboně|Jindřichův Hradec|37804|48.9624|14.9281
Chlum-Korouhvice|Žďár nad Sázavou|59265|49.5753|16.3208
Chlumany|Prachatice|38422|49.0667|13.9655
Chlumec|Český Krumlov|38232|48.8704|14.396
Chlumec|Ústí nad Labem|40339|50.6998|13.9398
Chlumec nad Cidlinou|Hradec Králové|50351|50.1545|15.4604
Chlumek|Žďár nad Sázavou|59442|49.3746|15.8549
Chlumy|Plzeň-jih|33501|49.4379|13.6387
Chlumín|Mělník|27743|50.2892|14.4494
Chlumčany|Plzeň-jih|33442|49.6327|13.3133
Chlumčany|Louny|43903|50.335|13.8433
Chlumětín|Žďár nad Sázavou|59202|49.7276|16.0032
Chlustina|Beroun|26751|49.878|13.9196
Chlístov|Třebíč|67522|49.2022|15.7438
Chlístov|Rychnov nad Kněžnou|51801|50.3225|16.1696
Chlístov|Benešov|25601|49.8016|14.6548
Chlístovice|Kutná Hora|28401|49.8858|15.2026
Chmelná|Benešov|25765|49.6482|14.9885
Chmelík|Svitavy|57001|49.7735|16.3329
Chobot|Strakonice|38801|49.4625|13.9338
Chocenice|Plzeň-jih|33601|49.5476|13.5202
Chocerady|Benešov|25724|49.873|14.8022
Choceň|Ústí nad Orlicí|56501|50.0017|16.2231
Chocnějovice|Mladá Boleslav|29413|50.577|14.9715
Chocomyšl|Domažlice|34543|49.4673|13.1308
Chodouny|Litoměřice|41171|50.4733|14.2502
Chodouň|Beroun|26751|49.8983|13.9867
Chodov|Karlovy Vary|36464|50.0686|12.863
Chodov|Sokolov|35735|50.2398|12.7477
Chodov|Domažlice|34533|49.4181|12.8303
Chodovlice|Litoměřice|41115|50.4632|13.9934
Chodová Planá|Tachov|34813|49.8933|12.7303
Chodská Lhota|Domažlice|34506|49.3585|13.0833
Chodský Újezd|Tachov|34815|49.8644|12.65
Cholenice|Jičín|50732|50.3248|15.2808
Cholina|Olomouc|78322|49.6562|17.0545
Choltice|Pardubice|53361|49.9878|15.6195
Chomle|Rokycany|33828|49.8624|13.6346
Chomutice|Jičín|50753|50.3594|15.4963
Chomutov|Chomutov|43004|50.4636|13.4108
Chomýž|Kroměříž|76861|49.3625|17.6455
Choratice|Benešov|28506|49.8394|14.8748
Chornice|Svitavy|56942|49.6675|16.7427
Chorušice|Mělník|27737|50.3907|14.6709
Choryně|Vsetín|75642|49.4958|17.8987
Choteč|Jičín|50781|50.433|15.516
Choteč|Pardubice|53304|50.0831|15.8803
Choteč|Praha-západ|25226|49.9867|14.283
Chotilsko|Příbram|26203|49.7706|14.3526
Chotiměř|Litoměřice|41002|50.5483|14.001
Chotiněves|Litoměřice|41145|50.5522|14.2794
Chotovice|Česká Lípa|47301|50.7404|14.5594
Chotovice|Svitavy|57001|49.8512|16.1714
Chotoviny|Tábor|39137|49.4781|14.677
Chotusice|Kutná Hora|28576|49.9492|15.3944
Chotutice|Kolín|28103|50.0701|14.99
Chotyně|Liberec|46334|50.8363|14.869
Chotíkov|Plzeň-sever|33017|49.7931|13.3178
Chotýčany|České Budějovice|37362|49.0674|14.5207
Chotýšany|Benešov|25728|49.7442|14.8147
Chotěboř|Havlíčkův Brod|58301|49.7207|15.6711
Chotěbudice|Třebíč|67531|49.0581|15.5741
Chotěbuz|Karviná|73561|49.7686|18.5692
Chotěmice|Tábor|39201|49.2753|14.877
Chotěnov|Svitavy|57001|49.8234|16.19
Chotětov|Mladá Boleslav|29428|50.3375|14.8016
Chotěvice|Trutnov|54371|50.5215|15.7668
Chotěšice|Nymburk|28901|50.2787|15.2732
Chotěšov|Plzeň-jih|33214|49.6542|13.2028
Chotěšov|Litoměřice|41002|50.4399|14.0853
Choustník|Tábor|39118|49.333|14.8385
Choustníkovo Hradiště|Trutnov|54442|50.4265|15.8787
Choťovice|Kolín|28905|50.1425|15.3198
Choťánky|Nymburk|29001|50.1383|15.1625
Chožov|Louny|43922|50.3989|13.8591
Chraberce|Louny|44001|50.4084|13.8296
Chrast|Chrudim|53851|49.9021|15.9341
Chrastava|Liberec|46331|50.817|14.9689
Chrastavec|Svitavy|56904|49.6179|16.5032
Chrastavice|Domažlice|34401|49.4537|12.9569
Chraštice|Příbram|26272|49.5769|14.0719
Chrbonín|Tábor|39155|49.3588|14.8644
Chroboly|Prachatice|38404|48.9566|14.0671
Chromeč|Šumperk|78901|49.9338|16.8938
Chropyně|Kroměříž|76811|49.3565|17.3646
Chroustov|Nymburk|28902|50.2867|15.3473
Chroustovice|Chrudim|53863|49.9556|15.9915
Chrtníky|Pardubice|53501|49.9819|15.605
Chrtníč|Havlíčkův Brod|58282|49.7676|15.4437
Chrudichromy|Blansko|68001|49.503|16.6281
Chrudim|Chrudim|53701|49.9498|15.7952
Chrustenice|Beroun|26712|50.0061|14.1523
Chrást|Plzeň-město|33003|49.7933|13.4937
Chrást|Nymburk|28914|50.119|14.8982
Chrást|Příbram|26272|49.5945|13.9568
Chrášťany|České Budějovice|37304|49.2961|14.3876
Chrášťany|Benešov|25601|49.7922|14.582
Chrášťany|Kolín|28201|50.0656|14.9303
Chrášťany|Praha-západ|25219|50.0461|14.2614
Chrášťany|Rakovník|27001|50.1465|13.6674
Chrášťovice|Strakonice|38601|49.3333|13.8971
Chržín|Kladno|27324|50.2955|14.2702
Chuchelna|Semily|51301|50.6024|15.3004
Chuchelná|Opava|74724|49.9867|18.1167
Chudenice|Klatovy|33901|49.4668|13.174
Chudenín|Klatovy|34022|49.2931|13.1009
Chuderov|Ústí nad Labem|40002|50.6887|14.0463
Chudeřice|Hradec Králové|50351|50.1491|15.551
Chudoslavice|Litoměřice|41201|50.583|14.1873
Chudíř|Mladá Boleslav|29445|50.3089|15.0139
Chudčice|Brno-venkov|66471|49.2886|16.4588
Chvalatice|Znojmo|67102|48.9478|15.7512
Chvaletice|Pardubice|53312|50.0345|15.4186
Chvaleč|Trutnov|54211|50.596|16.0394
Chvalkovice|Vyškov|68341|49.1871|17.1102
Chvalkovice|Náchod|55204|50.4144|15.9784
Chvalnov-Lísky|Kroměříž|76805|49.1661|17.231
Chvalovice|Prachatice|38411|49.0104|14.2318
Chvalovice|Znojmo|66902|48.7867|16.0824
Chvalíkovice|Opava|74706|49.8857|17.9111
Chvalčov|Kroměříž|76872|49.3893|17.7116
Chvalšiny|Český Krumlov|38208|48.8541|14.2112
Chvatěruby|Mělník|27801|50.2328|14.3428
Chvojenec|Pardubice|53401|50.1097|15.9373
Chválenice|Plzeň-město|33205|49.6431|13.4761
Chyjice|Jičín|50601|50.3877|15.2956
Chyňava|Beroun|26707|50.0275|14.0741
Chyše|Karlovy Vary|36453|50.1047|13.2492
Chyšky|Písek|39853|49.5236|14.4277
Chyšná|Pelhřimov|39501|49.5865|15.1
Chářovice|Benešov|25741|49.8204|14.578
Chýnice|Praha-západ|25217|49.9958|14.2644
Chýnov|Tábor|39155|49.4069|14.8113
Chýně|Praha-západ|25301|50.0608|14.2271
Chýstovice|Pelhřimov|39501|49.5858|15.0797
Chýšť|Pardubice|53316|50.1283|15.5414
Chřenovice|Havlíčkův Brod|58401|49.7167|15.2164
Chřibská|Děčín|40744|50.8633|14.4831
Chříč|Plzeň-sever|33141|49.9719|13.646
Cidlina|Třebíč|67544|49.1283|15.7356
Cikháj|Žďár nad Sázavou|59102|49.6449|15.9675
Citice|Sokolov|35601|50.1627|12.6134
Citonice|Znojmo|67101|48.8841|15.9646
Citov|Přerov|75103|49.4678|17.3256
Cizkrajov|Jindřichův Hradec|37881|49.0307|15.3898
Cotkytle|Ústí nad Orlicí|56132|49.9363|16.7241
Crhov|Blansko|67974|49.5451|16.4348
Ctiboř|Tachov|34701|49.8273|12.6101
Ctiboř|Benešov|25801|49.7368|14.9043
Ctidružice|Znojmo|67154|48.9826|15.8601
Ctiměřice|Mladá Boleslav|29446|50.3779|14.9935
Ctiněves|Litoměřice|41301|50.3748|14.3072
Ctětín|Chrudim|53825|49.8304|15.8395
Cvikov|Česká Lípa|47154|50.7773|14.633
Cvrčovice|Brno-venkov|69123|48.9938|16.5146
Cvrčovice|Kladno|27341|50.1799|14.1549
Církvice|Kolín|28144|49.9095|15.0158
Církvice|Kutná Hora|28533|49.9457|15.3352
Císařov|Přerov|75103|49.4661|17.3527
Cítoliby|Louny|43902|50.3328|13.8122
Cítov|Mělník|27704|50.3724|14.3982
Daleké Dušníky|Příbram|26301|49.7275|14.1866
Dalečín|Žďár nad Sázavou|59241|49.5914|16.2402
Dalešice|Třebíč|67554|49.1291|16.082
Dalešice|Jablonec nad Nisou|46802|50.6819|15.1847
Dalovice|Karlovy Vary|36263|50.2479|12.8959
Dalovice|Mladá Boleslav|29301|50.4258|14.88
Dambořice|Hodonín|69635|49.0384|16.9177
Damnice|Znojmo|67178|48.9204|16.3742
Damníkov|Ústí nad Orlicí|56123|49.8713|16.5604
Darkovice|Opava|74717|49.936|18.2222
Daskabát|Olomouc|77900|49.5786|17.4473
Dasnice|Sokolov|35709|50.1466|12.5673
Dasný|České Budějovice|37341|49.0193|14.4075
Davle|Praha-západ|25206|49.8923|14.4005
Dačice|Jindřichův Hradec|38001|49.0799|15.4343
Daňkovice|Žďár nad Sázavou|59203|49.6541|16.1487
Dašice|Pardubice|53303|50.0285|15.9125
Deblín|Brno-venkov|66475|49.3205|16.3465
Dehtáře|Pelhřimov|39301|49.4862|15.2754
Desná|Jablonec nad Nisou|46861|50.7548|15.3139
Desná|Svitavy|57001|49.8076|16.2242
Dešenice|Klatovy|34022|49.2744|13.1711
Dešná|Jindřichův Hradec|37873|48.9577|15.5429
Dešná|Zlín|76315|49.2667|17.846
Dešov|Třebíč|67533|48.9857|15.7015
Deštnice|Louny|43801|50.2307|13.6099
Deštná|Jindřichův Hradec|37825|49.2652|14.9241
Deštná|Blansko|67961|49.6127|16.5637
Deštné v Orlických horách|Rychnov nad Kněžnou|51791|50.3047|16.3508
Divec|Hradec Králové|50003|50.2399|15.9218
Divišov|Benešov|25726|49.7886|14.8759
Diváky|Břeclav|69171|48.9888|16.7919
Dlažkovice|Litoměřice|41115|50.4657|13.9651
Dlažov|Klatovy|34021|49.3659|13.1664
Dlouhomilov|Šumperk|78901|49.907|16.9914
Dlouhopolsko|Nymburk|28903|50.1753|15.3062
Dlouhoňovice|Ústí nad Orlicí|56401|50.0703|16.4416
Dlouhá Brtnice|Jihlava|58834|49.2362|15.6043
Dlouhá Lhota|Tábor|39155|49.3526|14.7891
Dlouhá Lhota|Blansko|67971|49.4288|16.5097
Dlouhá Lhota|Mladá Boleslav|29405|50.4202|15.0542
Dlouhá Lhota|Příbram|26301|49.7212|14.1207
Dlouhá Loučka|Olomouc|78386|49.8164|17.1798
Dlouhá Loučka|Svitavy|56943|49.7009|16.6414
Dlouhá Stráň|Bruntál|79201|49.9601|17.5006
Dlouhá Třebová|Ústí nad Orlicí|56117|49.9405|16.4234
Dlouhá Ves|Havlíčkův Brod|58222|49.5787|15.6748
Dlouhá Ves|Klatovy|34201|49.1964|13.5094
Dlouhé|Žďár nad Sázavou|59255|49.5091|16.1231
Dlouhý Most|Liberec|46312|50.7117|15.076
Dlouhý Újezd|Tachov|34701|49.7684|12.6286
Dnešice|Plzeň-jih|33443|49.6049|13.2647
Dobelice|Znojmo|67201|49.0173|16.2787
Dobev|Písek|39701|49.2953|14.0485
Dobkovice|Děčín|40703|50.7149|14.1933
Dobratice|Frýdek-Místek|73951|49.6605|18.4924
Dobrkovice|Zlín|76307|49.0946|17.6696
Dobrná|Děčín|40741|50.7696|14.2934
Dobrochov|Prostějov|79807|49.386|17.1057
Dobrohošť|Jindřichův Hradec|38001|49.0785|15.4886
Dobromilice|Prostějov|79825|49.3585|17.1416
Dobroměřice|Louny|44001|50.3702|13.7948
Dobronice u Bechyně|Tábor|39165|49.3434|14.4968
Dobronín|Jihlava|58812|49.4784|15.65
Dobroslavice|Opava|74794|49.8804|18.141
Dobroutov|Jihlava|58813|49.4623|15.7366
Dobrovice|Mladá Boleslav|29441|50.3694|14.9624
Dobrovítov|Kutná Hora|28601|49.7876|15.3288
Dobrovíz|Praha-západ|25261|50.1132|14.2178
Dobročkovice|Vyškov|68333|49.163|17.1091
Dobročovice|Praha-východ|25082|50.0564|14.7
Dobruška|Rychnov nad Kněžnou|51801|50.2921|16.1601
Dobrá|Frýdek-Místek|73951|49.6739|18.414
Dobrá Voda|Pelhřimov|39301|49.3582|15.2701
Dobrá Voda|Žďár nad Sázavou|59451|49.394|16.0651
Dobrá Voda u Hořic|Jičín|50773|50.3481|15.6027
Dobrá Voda u Pacova|Pelhřimov|39501|49.4044|15.0278
Dobrá Voda u Českých Budějovic|České Budějovice|37316|48.9683|14.525
Dobré|Rychnov nad Kněžnou|51793|50.2699|16.2639
Dobré Pole|Břeclav|69181|48.8244|16.5353
Dobrčice|Přerov|75002|49.4021|17.4806
Dobršín|Klatovy|34201|49.2614|13.5612
Dobřany|Rychnov nad Kněžnou|51801|50.3222|16.2854
Dobřany|Plzeň-jih|33441|49.6549|13.2932
Dobřejovice|Praha-východ|25101|49.9817|14.5784
Dobřenice|Hradec Králové|50325|50.1478|15.6411
Dobřeň|Mělník|27721|50.4795|14.5568
Dobřichov|Kolín|28911|50.0797|15.0325
Dobřichovice|Praha-západ|25229|49.9276|14.2748
Dobříkov|Ústí nad Orlicí|56601|50.0026|16.1339
Dobřínsko|Znojmo|67201|49.0523|16.2618
Dobřív|Rokycany|33844|49.7158|13.6869
Dobříč|Plzeň-sever|33005|49.8847|13.4685
Dobříč|Praha-západ|25225|50.02|14.259
Dobříň|Litoměřice|41301|50.4377|14.2939
Dobříš|Příbram|26301|49.7812|14.1673
Dobšice|České Budějovice|37501|49.216|14.4839
Dobšice|Znojmo|67182|48.8484|16.0855
Dobšice|Nymburk|28905|50.1325|15.2687
Dobšín|Mladá Boleslav|29404|50.4834|15.1168
Dohalice|Hradec Králové|50313|50.2874|15.6946
Doksany|Litoměřice|41182|50.455|14.1612
Doksy|Česká Lípa|47201|50.5659|14.6544
Doksy|Kladno|27364|50.1191|14.0479
Dolany|Náchod|55201|50.3801|15.9614
Dolany|Olomouc|78316|49.65|17.3225
Dolany|Pardubice|53345|50.1135|15.6917
Dolany|Klatovy|33901|49.4434|13.2482
Dolany|Plzeň-sever|33011|49.8079|13.4725
Dolany|Kladno|27351|50.1156|14.1498
Dolany|Mělník|27801|50.2221|14.3496
Dolce|Plzeň-jih|33401|49.553|13.3935
Dolenice|Znojmo|67178|48.9092|16.3658
Dolní Benešov|Opava|74722|49.9232|18.1014
Dolní Bezděkov|Chrudim|53862|49.9605|15.8839
Dolní Bečva|Vsetín|75655|49.4551|18.1943
Dolní Beřkovice|Mělník|27701|50.3932|14.4504
Dolní Bojanovice|Hodonín|69617|48.8587|17.0287
Dolní Bousov|Mladá Boleslav|29404|50.4383|15.1282
Dolní Branná|Trutnov|54362|50.5933|15.5939
Dolní Brusnice|Trutnov|54472|50.4588|15.7269
Dolní Bukovsko|České Budějovice|37365|49.171|14.5814
Dolní Bělá|Plzeň-sever|33152|49.8963|13.2734
Dolní Břežany|Praha-západ|25241|49.9633|14.4586
Dolní Cerekev|Jihlava|58845|49.3446|15.4567
Dolní Chvatliny|Kolín|28144|49.9806|15.0694
Dolní Dobrouč|Ústí nad Orlicí|56102|49.9928|16.4978
Dolní Domaslavice|Frýdek-Místek|73938|49.7128|18.4811
Dolní Dubňany|Znojmo|67173|49.0559|16.2268
Dolní Dunajovice|Břeclav|69185|48.8546|16.5929
Dolní Dvořiště|Český Krumlov|38272|48.6565|14.4523
Dolní Dvůr|Trutnov|54342|50.6523|15.6557
Dolní Habartice|Děčín|40502|50.7473|14.3334
Dolní Hbity|Příbram|26262|49.6576|14.1699
Dolní Heřmanice|Žďár nad Sázavou|59401|49.3049|16.0602
Dolní Hořice|Tábor|39155|49.4355|14.8506
Dolní Hrachovice|Tábor|39143|49.4862|14.7972
Dolní Hradiště|Plzeň-sever|33151|49.9138|13.4963
Dolní Kalná|Trutnov|54374|50.539|15.6393
Dolní Kounice|Brno-venkov|66464|49.0702|16.465
Dolní Kralovice|Benešov|25768|49.6442|15.1776
Dolní Krupá|Havlíčkův Brod|58271|49.6607|15.6031
Dolní Krupá|Mladá Boleslav|29501|50.5464|14.8673
Dolní Lažany|Třebíč|67551|49.1|15.8228
Dolní Lhota|Ostrava-město|74766|49.8425|18.0925
Dolní Lhota|Zlín|76323|49.1373|17.8125
Dolní Libochová|Žďár nad Sázavou|59253|49.4084|16.1847
Dolní Lochov|Jičín|50601|50.4522|15.2864
Dolní Lomná|Frýdek-Místek|73991|49.5479|18.7062
Dolní Loučky|Brno-venkov|59455|49.3611|16.3588
Dolní Lukavice|Plzeň-jih|33444|49.602|13.3443
Dolní Lutyně|Karviná|73553|49.8989|18.4283
Dolní Lánov|Trutnov|54341|50.5871|15.6644
Dolní Morava|Ústí nad Orlicí|56169|50.1224|16.7997
Dolní Moravice|Bruntál|79501|49.978|17.3224
Dolní Město|Havlíčkův Brod|58233|49.6278|15.3824
Dolní Nivy|Sokolov|35601|50.2432|12.6372
Dolní Novosedly|Písek|39701|49.3292|14.1961
Dolní Němčí|Uherské Hradiště|68762|48.9685|17.586
Dolní Nětčice|Přerov|75354|49.4763|17.6751
Dolní Olešnice|Trutnov|54375|50.524|15.7123
Dolní Podluží|Děčín|40755|50.88|14.5951
Dolní Pohleď|Kutná Hora|28522|49.7435|15.1336
Dolní Poustevna|Děčín|40782|50.9826|14.287
Dolní Pěna|Jindřichův Hradec|37701|49.1106|15.0222
Dolní Přím|Hradec Králové|50316|50.2397|15.7086
Dolní Radechová|Náchod|54911|50.4384|16.1513
Dolní Roveň|Pardubice|53371|50.0294|15.9678
Dolní Rožínka|Žďár nad Sázavou|59251|49.4771|16.2106
Dolní Rychnov|Sokolov|35604|50.1647|12.6452
Dolní Slivno|Mladá Boleslav|29478|50.3089|14.7328
Dolní Sokolovec|Havlíčkův Brod|58301|49.7266|15.7153
Dolní Stakory|Mladá Boleslav|29301|50.4374|14.9726
Dolní Studénky|Šumperk|78820|49.9352|16.9712
Dolní Tošanovice|Frýdek-Místek|73953|49.6843|18.4886
Dolní Těšice|Přerov|75353|49.4955|17.8069
Dolní Třebonín|Český Krumlov|38201|48.8555|14.4098
Dolní Vilémovice|Třebíč|67552|49.1537|15.9773
Dolní Vilímeč|Jihlava|58856|49.136|15.5205
Dolní Věstonice|Břeclav|69129|48.8883|16.6438
Dolní Zimoř|Mělník|27721|50.4267|14.5015
Dolní Zálezly|Ústí nad Labem|40301|50.5974|14.0432
Dolní Újezd|Přerov|75123|49.5461|17.5356
Dolní Újezd|Svitavy|56961|49.8257|16.2547
Dolní Čermná|Ústí nad Orlicí|56153|49.9796|16.5649
Dolní Řasnice|Liberec|46401|50.9458|15.1688
Dolní Ředice|Pardubice|53375|50.0779|15.924
Dolní Žandov|Cheb|35493|50.0181|12.5511
Dolní Životice|Opava|74756|49.8974|17.7798
Dolní Žďár|Jindřichův Hradec|37802|49.1012|14.9883
Doloplazy|Olomouc|78356|49.5673|17.4116
Doloplazy|Prostějov|79826|49.3503|17.1601
Dolánky nad Ohří|Litoměřice|41301|50.473|14.1627
Domamil|Třebíč|67543|49.0833|15.6957
Domanín|Jindřichův Hradec|37901|48.9718|14.7399
Domanín|Hodonín|69683|49.0018|17.2849
Domašov|Brno-venkov|66483|49.2454|16.3439
Domašov nad Bystřicí|Olomouc|78306|49.7424|17.4454
Domašov u Šternberka|Olomouc|78501|49.7059|17.338
Domašín|Chomutov|43151|50.4208|13.1723
Domaželice|Přerov|75115|49.4278|17.5459
Domažlice|Domažlice|34401|49.4398|12.9312
Domoraz|Klatovy|34201|49.2507|13.6621
Domousnice|Mladá Boleslav|29448|50.3943|15.1017
Domoušice|Louny|43968|50.2343|13.7296
Dománovice|Kolín|28002|50.112|15.3226
Doubek|Praha-východ|25101|50.0177|14.7379
Doubice|Děčín|40747|50.8887|14.4617
Doubrava|Karviná|73533|49.8588|18.4803
Doubravice|České Budějovice|37006|48.9359|14.5108
Doubravice|Strakonice|38735|49.3521|13.862
Doubravice|Trutnov|54451|50.4056|15.762
Doubravice nad Svitavou|Blansko|67911|49.4367|16.6295
Doubravička|Mladá Boleslav|29430|50.3952|14.7762
Doubravník|Brno-venkov|59261|49.4242|16.3528
Doubravy|Zlín|76345|49.1425|17.6682
Doubravčice|Kolín|28201|50.0222|14.7932
Doudleby|České Budějovice|37007|48.8936|14.5016
Doudleby nad Orlicí|Rychnov nad Kněžnou|51742|50.1076|16.2618
Doupovské Hradiště|Karlovy Vary|36272|50.25|13.0
Doupě|Jihlava|58856|49.2369|15.4347
Doňov|Jindřichův Hradec|37821|49.2132|14.7762
Drachkov|Strakonice|38601|49.2429|13.8416
Drahanovice|Olomouc|78344|49.5787|17.0771
Drahany|Prostějov|79861|49.4334|16.8975
Drahelčice|Praha-západ|25219|50.0319|14.2031
Drahenice|Příbram|26285|49.5209|13.9585
Drahkov|Plzeň-jih|33601|49.5573|13.4725
Drahlín|Příbram|26101|49.7323|13.969
Drahobudice|Kolín|28144|49.9376|15.0664
Drahobuz|Litoměřice|41145|50.5252|14.3208
Drahonice|Strakonice|38901|49.2009|14.0747
Drahonín|Brno-venkov|59261|49.4142|16.277
Drahotín|Domažlice|34522|49.5242|12.7583
Drahotěšice|České Budějovice|37341|49.1244|14.5467
Drahouš|Rakovník|27033|50.0802|13.4758
Drahov|Tábor|39181|49.1755|14.7543
Drahoňův Újezd|Rokycany|33808|49.8772|13.7259
Drahňovice|Benešov|25726|49.8226|14.9017
Draženov|Domažlice|34401|49.4558|12.8728
Dražeň|Plzeň-sever|33101|49.927|13.288
Dražice|Tábor|39131|49.4153|14.6407
Dražičky|Tábor|39175|49.3991|14.5988
Dražovice|Vyškov|68301|49.1948|16.9435
Dražovice|Klatovy|34201|49.2248|13.6071
Dražíč|České Budějovice|37501|49.306|14.3839
Dražůvky|Hodonín|69633|49.0306|17.0191
Drevníky|Příbram|26301|49.7203|14.2741
Drhovice|Tábor|39131|49.4329|14.5585
Drhovle|Písek|39701|49.334|14.0424
Drhovy|Příbram|26301|49.7392|14.2325
Drmoul|Cheb|35301|49.9391|12.6656
Drnek|Kladno|27377|50.1957|13.9725
Drnholec|Břeclav|69183|48.8576|16.486
Drnovice|Blansko|67976|49.4694|16.5423
Drnovice|Vyškov|68304|49.2764|16.9516
Drnovice|Zlín|76325|49.179|17.9574
Drobovice|Kutná Hora|28601|49.8896|15.4135
Droužetice|Strakonice|38601|49.2892|13.8981
Droužkovice|Chomutov|43144|50.4309|13.4292
Drozdov|Šumperk|78901|49.9078|16.7874
Drozdov|Beroun|26761|49.8632|13.8407
Drslavice|Prachatice|38301|49.0254|13.9209
Drslavice|Uherské Hradiště|68733|49.0472|17.6002
Druhanov|Havlíčkův Brod|58291|49.6989|15.4103
Drunče|Jindřichův Hradec|37821|49.2969|14.9366
Druztová|Plzeň-sever|33007|49.7975|13.4488
Družec|Kladno|27362|50.1031|14.0455
Drysice|Vyškov|68321|49.3346|17.0578
Dráchov|Tábor|39201|49.2265|14.7067
Drásov|Brno-venkov|66424|49.3319|16.4781
Drásov|Příbram|26101|49.7022|14.1178
Drážov|Strakonice|38719|49.1674|13.7407
Držkov|Jablonec nad Nisou|46824|50.6876|15.3033
Držková|Zlín|76319|49.3192|17.7856
Držovice|Prostějov|79607|49.4912|17.1341
Dub|Prachatice|38425|49.1083|14.0122
Dub nad Moravou|Olomouc|78375|49.4826|17.2773
Dubany|Pardubice|53002|49.9932|15.7251
Dubenec|Trutnov|54455|50.3777|15.7952
Dubenec|Příbram|26101|49.6958|14.0793
Dubicko|Šumperk|78972|49.8282|16.9628
Dubičné|České Budějovice|37371|48.9812|14.5389
Dublovice|Příbram|26251|49.6719|14.361
Dubnice|Česká Lípa|47126|50.7261|14.8088
Dubno|Příbram|26101|49.696|14.0519
Dubné|České Budějovice|37384|48.9763|14.3605
Dubovice|Pelhřimov|39301|49.4246|15.2167
Dubá|Česká Lípa|47141|50.5404|14.5403
Dubí|Teplice|41701|50.6811|13.7889
Dubčany|Olomouc|78322|49.6493|17.0789
Dubňany|Hodonín|69603|48.917|17.0901
Duchcov|Teplice|41901|50.6039|13.7463
Dudín|Jihlava|58805|49.4511|15.3977
Dukovany|Třebíč|67556|49.0814|16.1923
Dunajovice|Jindřichův Hradec|37901|49.0351|14.6953
Dunice|Benešov|25768|49.6032|15.1527
Dušejov|Jihlava|58805|49.4088|15.4328
Dušníky|Litoměřice|41301|50.4246|14.1903
Dvakačovice|Chrudim|53862|49.979|15.8945
Dvorce|Jihlava|58851|49.3755|15.4905
Dvorce|Bruntál|79368|49.8334|17.5477
Dvory|Prachatice|38301|49.0395|13.9463
Dvory|Nymburk|28802|50.2118|14.9956
Dvory nad Lužnicí|Jindřichův Hradec|37808|48.8528|14.9006
Dvůr Králové nad Labem|Trutnov|54401|50.4318|15.8141
Dyje|Znojmo|66902|48.8472|16.1166
Dyjice|Jihlava|58856|49.1747|15.494
Dyjákovice|Znojmo|67126|48.772|16.3011
Dyjákovičky|Znojmo|66902|48.7824|16.0957
Dymokury|Nymburk|28901|50.2458|15.2027
Dynín|České Budějovice|37364|49.1373|14.6313
Dzbel|Prostějov|79853|49.613|16.851
Dílce|Jičín|50601|50.4673|15.3594
Díly|Domažlice|34401|49.4464|12.7865
Dírná|Tábor|39127|49.243|14.8449
Dívčice|České Budějovice|37348|49.1087|14.3094
Dívčí Hrad|Bruntál|79399|50.2439|17.6339
Dívčí Kopy|Jindřichův Hradec|37842|49.2604|15.046
Dýšina|Plzeň-město|33002|49.7775|13.4916
DĚČÍN|Děčín|40502|50.7727|14.2129
Dědice|Třebíč|67541|49.0298|15.7279
Dědová|Chrudim|53901|49.7612|15.9866
Děhylov|Opava|74794|49.8695|18.1634
Děkanovice|Benešov|25768|49.6188|15.1486
Děkov|Rakovník|27004|50.1713|13.5545
Děpoltovice|Karlovy Vary|36225|50.2947|12.814
Dětenice|Jičín|50724|50.3682|15.1706
Dětkovice|Vyškov|68323|49.2728|17.1443
Dětkovice|Prostějov|79804|49.4155|17.0823
Dětmarovice|Karviná|73571|49.8942|18.4609
Dětřichov|Liberec|46401|50.8927|15.0367
Dětřichov|Svitavy|56802|49.8001|16.5327
Dětřichov nad Bystřicí|Bruntál|79303|49.8343|17.4018
Dětřichov u Moravské Třebové|Svitavy|57101|49.7872|16.7106
Děčany|Litoměřice|41115|50.4387|13.9086
Dřenice|Chrudim|53701|49.9826|15.7455
Dřetovice|Kladno|27342|50.1828|14.2104
Dřevnovice|Prostějov|79826|49.3282|17.1434
Dřevohostice|Přerov|75114|49.426|17.5922
Dřevčice|Praha-východ|25001|50.1679|14.6283
Dřevěnice|Jičín|50713|50.4524|15.4472
Dřešín|Strakonice|38719|49.1612|13.7758
Dřínov|Kladno|27371|50.2757|14.0699
Dřínov|Mělník|27745|50.2738|14.3976
Dřínov|Kroměříž|76833|49.293|17.2335
Dřísy|Praha-východ|27714|50.2561|14.6437
Dříteč|Pardubice|53305|50.1052|15.8089
Dříteň|České Budějovice|37351|49.1429|14.3461
Důl|Pelhřimov|39501|49.4522|15.0302
Džbánice|Znojmo|67171|49.0014|16.211
Džbánov|Ústí nad Orlicí|56601|49.9165|16.1596
Ejpovice|Rokycany|33701|49.7462|13.5144
Erpužice|Tachov|34901|49.8071|13.0361
Evaň|Litoměřice|41002|50.3842|14.029
Eš|Pelhřimov|39501|49.4347|15.0014
FRÝDEK-MÍSTEK|Frýdek-Místek|73801|49.682|18.3674
Felbabka|Beroun|26801|49.8135|13.942
Frahelž|Jindřichův Hradec|37901|49.1172|14.732
Francova Lhota|Vsetín|75614|49.2018|18.1119
Františkov nad Ploučnicí|Děčín|40723|50.7258|14.327
Františkovy Lázně|Cheb|35101|50.1202|12.3498
Frenštát pod Radhoštěm|Nový Jičín|74401|49.5484|18.2109
Frymburk|Český Krumlov|38279|48.661|14.1657
Frymburk|Klatovy|34201|49.2497|13.7074
Fryčovice|Frýdek-Místek|73945|49.6669|18.2233
Fryšava pod Žákovou horou|Žďár nad Sázavou|59204|49.6305|16.0444
Fryšták|Zlín|76316|49.2853|17.6836
Frýdlant|Liberec|46401|50.9215|15.0799
Frýdlant nad Ostravicí|Frýdek-Místek|73911|49.5919|18.3586
Frýdštejn|Jablonec nad Nisou|46342|50.6524|15.1589
Fulnek|Nový Jičín|74245|49.7125|17.9033
Golčův Jeníkov|Havlíčkův Brod|58282|49.8164|15.477
Grešlové Mýto|Znojmo|67156|48.9809|15.8863
Gruna|Svitavy|57101|49.763|16.7429
Grunta|Kolín|28002|49.9742|15.2551
Grygov|Olomouc|78373|49.538|17.3109
Grymov|Přerov|75121|49.4811|17.4981
HAVÍŘOV|Karviná|73601|49.7805|18.4307
HRADEC KRÁLOVÉ|Hradec Králové|50002|50.2105|15.8253
Habartice|Liberec|46373|51.0191|15.0653
Habartov|Sokolov|35709|50.1831|12.5507
Habrovany|Vyškov|68301|49.2329|16.8784
Habrovany|Ústí nad Labem|40002|50.5987|13.9818
Habry|Havlíčkův Brod|58281|49.7561|15.485
Habrůvka|Blansko|67905|49.3036|16.7236
Habřina|Hradec Králové|50303|50.326|15.827
Habří|České Budějovice|37384|48.9482|14.3349
Hadravova Rosička|Jindřichův Hradec|37842|49.251|15.0475
Hajany|Strakonice|38801|49.4467|13.836
Hajany|Brno-venkov|66443|49.1109|16.5551
Hajnice|Trutnov|54466|50.488|15.9087
Halenkov|Vsetín|75603|49.3175|18.1476
Halenkovice|Zlín|76363|49.1711|17.4717
Haluzice|Zlín|76324|49.138|17.8974
Halámky|Jindřichův Hradec|37806|48.8532|14.9152
Halže|Tachov|34701|49.8311|12.5795
Hamr|Jindřichův Hradec|37806|48.9495|14.9135
Hamr na Jezeře|Česká Lípa|47128|50.703|14.8383
Hamry|Chrudim|53901|49.7391|15.9265
Hamry|Klatovy|34022|49.2154|13.1605
Hamry nad Sázavou|Žďár nad Sázavou|59101|49.5661|15.9018
Hanušovice|Šumperk|78833|50.0806|16.9365
Harrachov|Semily|51246|50.7722|15.4315
Hartinkov|Svitavy|56943|49.6792|16.814
Hartmanice|České Budějovice|37365|49.208|14.5652
Hartmanice|Svitavy|56992|49.6253|16.373
Hartmanice|Klatovy|34201|49.1696|13.4547
Hartvíkovice|Třebíč|67576|49.1712|16.0904
Hatín|Jindřichův Hradec|37701|49.1088|14.9111
Havlovice|Trutnov|54232|50.4876|16.0294
Havlíčkova Borová|Havlíčkův Brod|58223|49.6359|15.7817
Havlíčkův Brod|Havlíčkův Brod|58001|49.6044|15.5798
Havraníky|Znojmo|66902|48.8115|16.0085
Havraň|Most|43501|50.4501|13.5989
Hazlov|Cheb|35132|50.1565|12.2726
Hačky|Prostějov|79855|49.6225|16.9377
Haňovice|Olomouc|78321|49.6812|17.0452
Haškovcova Lhota|Tábor|39165|49.3326|14.4667
Hať|Opava|74716|49.9465|18.2394
Hejnice|Liberec|46362|50.8773|15.1818
Hejnice|Ústí nad Orlicí|56401|50.056|16.3995
Hejná|Klatovy|34101|49.2895|13.6748
Hejtmánkovice|Náchod|55001|50.5994|16.2995
Helvíkovice|Ústí nad Orlicí|56401|50.0923|16.431
Heraltice|Třebíč|67521|49.2309|15.7306
Herink|Praha-východ|25101|49.967|14.575
Heroltice|Brno-venkov|66601|49.3115|16.4129
Herálec|Havlíčkův Brod|58255|49.5309|15.4572
Herálec|Žďár nad Sázavou|59201|49.689|15.9944
Heršpice|Vyškov|68401|49.1199|16.9137
Hevlín|Znojmo|67169|48.7522|16.3814
Heřmaneč|Jindřichův Hradec|37853|49.1296|15.2855
Heřmanice|Havlíčkův Brod|58282|49.824|15.5473
Heřmanice|Náchod|55212|50.3797|15.9186
Heřmanice|Liberec|46401|50.897|15.0065
Heřmanice u Oder|Nový Jičín|74235|49.7138|17.8054
Heřmaničky|Benešov|25789|49.6054|14.5826
Heřmanov|Žďár nad Sázavou|59458|49.3795|16.1813
Heřmanov|Děčín|40502|50.7266|14.2913
Heřmanova Huť|Plzeň-sever|33023|49.7091|13.0893
Heřmanovice|Bruntál|79374|50.1934|17.3979
Heřmanův Městec|Chrudim|53803|49.9472|15.665
Heřmaň|České Budějovice|37007|48.9115|14.5038
Heřmaň|Písek|39811|49.2326|14.1356
Heřmánkovice|Náchod|54984|50.62|16.324
Heřmánky|Nový Jičín|74235|49.7071|17.7684
Hladké Životice|Nový Jičín|74247|49.683|17.9575
Hladov|Jihlava|58833|49.2147|15.6115
Hlasivo|Tábor|39143|49.4986|14.7504
Hlavatce|České Budějovice|37348|49.0674|14.2633
Hlavatce|Tábor|39173|49.2956|14.6213
Hlavenec|Praha-východ|29474|50.2384|14.7019
Hlavečník|Pardubice|53315|50.0756|15.4266
Hlavice|Liberec|46348|50.632|14.9267
Hlavnice|Opava|74752|49.9245|17.728
Hlavňovice|Klatovy|34142|49.238|13.3952
Hlince|Plzeň-sever|33141|49.9483|13.6251
Hlincová Hora|České Budějovice|37371|48.9837|14.5646
Hlinka|Bruntál|79399|50.2801|17.6723
Hlinná|Litoměřice|41201|50.5725|14.1068
Hlinsko|Přerov|75131|49.4946|17.5793
Hlinsko|Chrudim|53901|49.7622|15.9077
Hlohovec|Břeclav|69143|48.7741|16.7624
Hlohovice|Rokycany|33808|49.8896|13.6434
Hlohová|Domažlice|34561|49.5341|13.0747
Hlohovčice|Domažlice|34561|49.5209|13.1139
Hluboká|Chrudim|53973|49.8457|16.0716
Hluboká nad Vltavou|České Budějovice|37341|49.0524|14.4344
Hluboké|Třebíč|67571|49.226|16.2276
Hluboké Dvory|Brno-venkov|67923|49.3832|16.5143
Hluboké Mašůvky|Znojmo|67152|48.9238|16.0257
Hlubočany|Vyškov|68201|49.2305|17.0005
Hlubočec|Opava|74769|49.8407|17.9704
Hlubočky|Olomouc|78361|49.6277|17.4026
Hluboš|Příbram|26222|49.7463|14.0203
Hlubyně|Příbram|26272|49.5598|13.9233
Hluchov|Prostějov|79841|49.5415|16.9967
Hluk|Uherské Hradiště|68725|48.9882|17.5268
Hlupín|Strakonice|38601|49.3348|13.8069
Hlučín|Opava|74801|49.8966|18.1906
Hlušice|Hradec Králové|50356|50.2647|15.4034
Hlušovice|Olomouc|78314|49.6382|17.2775
Hlásnice|Olomouc|78501|49.7535|17.2947
Hlásná Třebaň|Beroun|26718|49.9223|14.1988
Hlína|Brno-venkov|66491|49.1137|16.4263
Hlízov|Kutná Hora|28532|49.9851|15.2952
Hnanice|Znojmo|66902|48.7986|15.9868
Hnačov|Klatovy|34034|49.3619|13.4818
Hnojice|Olomouc|78501|49.7164|17.2242
Hnojník|Frýdek-Místek|73953|49.6824|18.5414
Hnátnice|Ústí nad Orlicí|56101|50.0204|16.4387
Hněvkovice|Havlíčkův Brod|58294|49.6853|15.2029
Hněvnice|Plzeň-sever|33023|49.7286|13.1032
Hněvotín|Olomouc|78347|49.5722|17.1796
Hněvošice|Opava|74735|50.0031|18.0084
Hněvčeves|Hradec Králové|50315|50.315|15.7162
Hobšovice|Kladno|27321|50.2706|14.1623
Hodice|Jihlava|58901|49.2702|15.4801
Hodkovice nad Mohelkou|Liberec|46342|50.666|15.09
Hodonice|Tábor|39165|49.2686|14.4875
Hodonice|Znojmo|67125|48.8369|16.1635
Hodonín|Blansko|67971|49.5013|16.4104
Hodonín|Hodonín|69501|48.853|17.1261
Hodonín|Chrudim|53825|49.8371|15.7872
Hodov|Třebíč|67504|49.2941|15.9839
Hodslavice|Nový Jičín|74271|49.5387|18.0238
Hodíškov|Žďár nad Sázavou|59101|49.5036|16.0381
Hodějice|Vyškov|68401|49.1416|16.9138
Hodětín|Tábor|39165|49.2523|14.5487
Hojanovice|Pelhřimov|39601|49.5974|15.2656
Hojkov|Jihlava|58805|49.3892|15.4138
Hojovice|Pelhřimov|39501|49.3285|14.9199
Holany|Česká Lípa|47002|50.6181|14.4931
Holasice|Brno-venkov|66461|49.076|16.6077
Holasovice|Opava|74774|49.9985|17.8086
Holedeč|Louny|43801|50.2775|13.5631
Holenice|Semily|50601|50.5205|15.3005
Holetín|Chrudim|53971|49.7949|15.9235
Holešov|Kroměříž|76901|49.3334|17.5784
Holice|Pardubice|53401|50.0661|15.986
Holohlavy|Hradec Králové|50303|50.308|15.8602
Holotín|Pardubice|53501|49.946|15.5803
Holoubkov|Rokycany|33801|49.7761|13.6926
Holovousy|Jičín|50801|50.3754|15.5775
Holovousy|Plzeň-sever|33141|49.968|13.6148
Holubice|Vyškov|68351|49.1776|16.8122
Holubice|Praha-západ|25265|50.2032|14.2929
Holubov|Český Krumlov|38203|48.8901|14.3212
Holín|Jičín|50601|50.4517|15.3208
Holýšov|Domažlice|34562|49.5937|13.1014
Holčovice|Bruntál|79371|50.1568|17.4861
Holštejn|Blansko|67913|49.4065|16.7778
Homole|České Budějovice|37001|48.939|14.4296
Homole u Panny|Ústí nad Labem|40002|50.6294|14.1865
Honbice|Chrudim|53862|49.9336|15.8931
Honezovice|Plzeň-jih|33301|49.6383|13.0627
Honětice|Kroměříž|76813|49.2038|17.2532
Hora Svaté Kateřiny|Most|43546|50.6064|13.4368
Hora Svatého Václava|Domažlice|34522|49.519|12.74
Hora Svatého Šebestiána|Chomutov|43182|50.5103|13.2515
Horažďovice|Klatovy|34101|49.3208|13.7011
Horka|Chrudim|53851|49.8873|15.9169
Horka I|Kutná Hora|28601|49.9828|15.44
Horka II|Kutná Hora|28522|49.7322|15.1339
Horka nad Moravou|Olomouc|78335|49.6402|17.2108
Horka u Staré Paky|Semily|51234|50.5262|15.5758
Horky|Svitavy|57001|49.9208|16.2435
Horky|Kutná Hora|28601|49.8689|15.4399
Horky nad Jizerou|Mladá Boleslav|29473|50.3272|14.8562
Hornice|Třebíč|67532|48.9953|15.6805
Hornosín|Strakonice|38742|49.4829|13.8399
Horní Benešov|Bruntál|79312|49.9669|17.6027
Horní Bezděkov|Kladno|27351|50.0824|14.0676
Horní Bečva|Vsetín|75657|49.4323|18.2887
Horní Beřkovice|Litoměřice|41185|50.3588|14.3466
Horní Blatná|Karlovy Vary|36235|50.3905|12.771
Horní Bludovice|Karviná|73937|49.7497|18.4369
Horní Bojanovice|Břeclav|69301|48.9498|16.8003
Horní Bradlo|Chrudim|53953|49.8024|15.7444
Horní Branná|Semily|51236|50.6084|15.5716
Horní Brusnice|Trutnov|54474|50.4732|15.6811
Horní Bukovina|Mladá Boleslav|29501|50.5433|14.9262
Horní Bělá|Plzeň-sever|33152|49.8891|13.2642
Horní Břečkov|Znojmo|67102|48.8901|15.8986
Horní Bříza|Plzeň-sever|33012|49.8402|13.3557
Horní Cerekev|Pelhřimov|39403|49.3204|15.3278
Horní Domaslavice|Frýdek-Místek|73951|49.6947|18.4614
Horní Dubenky|Jihlava|58852|49.2597|15.3171
Horní Dubňany|Znojmo|67173|49.0635|16.2014
Horní Dunajovice|Znojmo|67134|48.9503|16.1616
Horní Dvořiště|Český Krumlov|38293|48.6039|14.4058
Horní Habartice|Děčín|40502|50.7622|14.3407
Horní Heřmanice|Třebíč|67505|49.3295|15.9205
Horní Heřmanice|Ústí nad Orlicí|56133|49.9611|16.7113
Horní Jelení|Pardubice|53374|50.0491|16.0841
Horní Jiřetín|Most|43543|50.5732|13.5473
Horní Kalná|Trutnov|54371|50.5629|15.6249
Horní Kamenice|Domažlice|34562|49.5697|13.1012
Horní Kněžeklady|České Budějovice|37501|49.1938|14.4815
Horní Kounice|Znojmo|67140|49.0261|16.1524
Horní Kozolupy|Tachov|34952|49.8376|12.9418
Horní Krupá|Havlíčkův Brod|58001|49.6721|15.5886
Horní Kruty|Kolín|28146|49.9195|14.9598
Horní Lapač|Kroměříž|76901|49.301|17.6175
Horní Lhota|Ostrava-město|74764|49.8531|18.0685
Horní Lhota|Zlín|76323|49.1544|17.8045
Horní Libchava|Česká Lípa|47111|50.7126|14.4935
Horní Libochová|Žďár nad Sázavou|59451|49.4077|16.149
Horní Lideč|Vsetín|75612|49.1813|18.0611
Horní Loděnice|Olomouc|78305|49.7711|17.3773
Horní Lomná|Frýdek-Místek|73991|49.528|18.6378
Horní Loučky|Brno-venkov|59455|49.3669|16.3415
Horní Lukavice|Plzeň-jih|33401|49.6124|13.3271
Horní Maršov|Trutnov|54226|50.6587|15.8199
Horní Meziříčko|Jindřichův Hradec|37853|49.1567|15.2446
Horní Moštěnice|Přerov|75117|49.4122|17.4589
Horní Myslová|Jihlava|58856|49.1655|15.4227
Horní Město|Bruntál|79344|49.9085|17.2112
Horní Němčice|Jindřichův Hradec|37853|49.1579|15.2798
Horní Němčí|Uherské Hradiště|68764|48.9333|17.6243
Horní Nětčice|Přerov|75354|49.4702|17.6845
Horní Olešnice|Trutnov|54371|50.5328|15.6775
Horní Paseka|Havlíčkův Brod|58401|49.6298|15.2933
Horní Planá|Český Krumlov|38226|48.7675|14.0327
Horní Podluží|Děčín|40757|50.8815|14.5457
Horní Police|Česká Lípa|47106|50.7042|14.4041
Horní Počaply|Mělník|27703|50.4245|14.39
Horní Poříčí|Strakonice|38601|49.2861|13.7829
Horní Poříčí|Blansko|67962|49.5877|16.4774
Horní Pěna|Jindřichův Hradec|37831|49.1045|15.0424
Horní Radechová|Náchod|54946|50.4674|16.1446
Horní Radouň|Jindřichův Hradec|37843|49.2572|15.0058
Horní Radslavice|Žďár nad Sázavou|59401|49.3383|15.9024
Horní Rožínka|Žďár nad Sázavou|59251|49.5001|16.193
Horní Rápotice|Pelhřimov|39601|49.5754|15.3206
Horní Skrýchov|Jindřichův Hradec|37701|49.1729|15.0285
Horní Slatina|Jindřichův Hradec|38001|49.0906|15.5688
Horní Slavkov|Sokolov|35731|50.1387|12.8077
Horní Slivno|Mladá Boleslav|29479|50.3041|14.705
Horní Smrčné|Třebíč|67507|49.3287|15.7562
Horní Smržov|Blansko|67961|49.6184|16.5771
Horní Stropnice|České Budějovice|37335|48.7613|14.7351
Horní Studénky|Šumperk|78901|49.9528|16.8117
Horní Suchá|Karviná|73535|49.7979|18.482
Horní Tošanovice|Frýdek-Místek|73953|49.6925|18.5054
Horní Těšice|Přerov|75353|49.4958|17.7861
Horní Třešňovec|Ústí nad Orlicí|56301|49.9393|16.6026
Horní Ves|Pelhřimov|39301|49.2935|15.3076
Horní Vilémovice|Třebíč|67507|49.2917|15.8809
Horní Vltavice|Prachatice|38491|48.9571|13.7588
Horní Věstonice|Břeclav|69181|48.8747|16.6257
Horní Újezd|Třebíč|67522|49.1429|15.8423
Horní Újezd|Přerov|75353|49.4484|17.7273
Horní Újezd|Svitavy|57001|49.8036|16.233
Horní Čermná|Ústí nad Orlicí|56156|49.9706|16.6078
Horní Řasnice|Liberec|46401|50.9656|15.2016
Horní Ředice|Pardubice|53375|50.0766|15.9589
Horní Řepčice|Litoměřice|41145|50.5567|14.2533
Horní Štěpánov|Prostějov|79847|49.5491|16.7909
Horní Životice|Bruntál|79312|49.969|17.6409
Horoměřice|Praha-západ|25262|50.1318|14.3389
Horosedly|Písek|39804|49.5129|14.0541
Horoušany|Praha-východ|25082|50.1065|14.7407
Horská Kvilda|Klatovy|38501|49.0577|13.5581
Horušice|Kutná Hora|28573|49.9966|15.429
Hory|Karlovy Vary|36001|50.2139|12.79
Horčápsko|Příbram|26272|49.5845|13.9846
Horšice|Plzeň-jih|33455|49.5316|13.3863
Horšovský Týn|Domažlice|34601|49.5303|12.9445
Hoslovice|Strakonice|38719|49.1913|13.7632
Hospozín|Kladno|27322|50.307|14.1719
Hospříz|Jindřichův Hradec|37701|49.1287|15.0856
Hostašovice|Nový Jičín|74101|49.5344|17.9974
Hostim|Znojmo|67154|49.0187|15.895
Hostinné|Trutnov|54371|50.5408|15.7234
Hostivice|Praha-západ|25301|50.0817|14.2587
Hostišová|Zlín|76301|49.2538|17.5912
Hostomice|Beroun|26724|49.8254|14.0457
Hostomice|Teplice|41752|50.5878|13.8081
Hostouň|Domažlice|34525|49.5598|12.7716
Hostouň|Kladno|27353|50.1145|14.2014
Hostovlice|Kutná Hora|28562|49.8604|15.4664
Hosty|České Budějovice|37501|49.2604|14.3934
Hostín|Mělník|27732|50.3405|14.589
Hostín u Vojkovic|Mělník|27744|50.2972|14.3971
Hostějov|Uherské Hradiště|68741|49.0403|17.2573
Hostěnice|Brno-venkov|66404|49.2366|16.7767
Hostěradice|Znojmo|67171|48.9502|16.2594
Hostěrádky-Rešov|Vyškov|68352|49.1178|16.7844
Hostětice|Jihlava|58856|49.1918|15.4142
Hostětín|Uherské Hradiště|68771|49.05|17.8795
Hosín|České Budějovice|37341|49.0374|14.476
Hovorany|Hodonín|69612|48.955|16.9936
Hovorčovice|Praha-východ|25064|50.1788|14.518
Hovězí|Vsetín|75601|49.3037|18.0607
Hořany|Nymburk|28914|50.0977|14.9459
Hořenice|Náchod|55101|50.3693|15.9109
Hořepník|Pelhřimov|39421|49.5126|15.1071
Hořesedly|Rakovník|27004|50.1624|13.6028
Hořešovice|Kladno|27374|50.2717|13.9669
Hořešovičky|Kladno|27374|50.275|13.9559
Hořice|Pelhřimov|39601|49.5994|15.1855
Hořice|Jičín|50801|50.3662|15.6319
Hořice na Šumavě|Český Krumlov|38222|48.766|14.1785
Hořiněves|Hradec Králové|50306|50.3096|15.7674
Hořičky|Náchod|55205|50.4449|15.9936
Hořovice|Beroun|26801|49.8361|13.9028
Hořovičky|Rakovník|27004|50.1557|13.5315
Hořátev|Nymburk|28913|50.1503|15.0394
Hořín|Mělník|27601|50.3449|14.4643
Hoštejn|Šumperk|78901|49.8745|16.7749
Hoštice|Strakonice|38701|49.1943|13.9096
Hoštice|Kroměříž|76813|49.2086|17.2339
Hoštice-Heroltice|Vyškov|68201|49.2871|17.0629
Hoštka|Litoměřice|41172|50.4887|14.3351
Hošťalovice|Chrudim|53803|49.9349|15.576
Hošťka|Tachov|34806|49.6963|12.5976
Hošťálkovy|Bruntál|79401|50.1117|17.5996
Hošťálková|Vsetín|75622|49.3548|17.8695
Hrabišín|Šumperk|78804|49.9141|17.0365
Hrabová|Šumperk|78901|49.8455|16.954
Hrabyně|Opava|74763|49.8826|18.0549
Hrabětice|Znojmo|67168|48.7978|16.3935
Hraběšice|Šumperk|78815|49.9767|17.0796
Hraběšín|Kutná Hora|28601|49.8526|15.3319
Hrabůvka|Přerov|75301|49.5786|17.6914
Hracholusky|Prachatice|38301|49.0589|14.0886
Hracholusky|Rakovník|27041|50.0034|13.774
Hrachoviště|Jindřichův Hradec|37901|48.9295|14.7712
Hradce|České Budějovice|37001|48.9334|14.36
Hradec|Havlíčkův Brod|58401|49.7073|15.2956
Hradec|Plzeň-jih|33211|49.6352|13.1215
Hradec nad Moravicí|Opava|74741|49.8711|17.8759
Hradec nad Svitavou|Svitavy|56901|49.7115|16.4807
Hradec-Nová Ves|Jeseník|79084|50.2832|17.2813
Hradečno|Kladno|27304|50.1884|13.9914
Hradešice|Klatovy|34101|49.3232|13.5965
Hradešín|Kolín|28201|50.0389|14.7568
Hradištko|Nymburk|28912|50.1656|14.9352
Hradištko|Praha-západ|25209|49.8703|14.408
Hradiště|Domažlice|34543|49.4649|13.0518
Hradiště|Plzeň-jih|33544|49.4394|13.7562
Hradiště|Rokycany|33808|49.9631|13.7177
Hradiště|Benešov|25801|49.6843|14.8488
Hradiště (vojenský újezd)|Karlovy Vary|36006|50.1745|13.0468
Hradčany|Brno-venkov|66603|49.328|16.4423
Hradčany|Přerov|75111|49.4527|17.5717
Hradčany|Nymburk|28905|50.1581|15.27
Hradčany-Kobeřice|Prostějov|79807|49.3642|17.1284
Hradčovice|Uherské Hradiště|68733|49.0499|17.5822
Hranice|České Budějovice|37401|48.8385|14.8684
Hranice|Cheb|35124|50.3047|12.1759
Hranice|Přerov|75301|49.5498|17.735
Hraničné Petrovice|Olomouc|78306|49.7409|17.405
Hrazany|Písek|39901|49.5229|14.335
Hrdibořice|Prostějov|79812|49.4786|17.2205
Hrdlořezy|Mladá Boleslav|29307|50.4515|14.8755
Hrdlív|Kladno|27306|50.1994|14.0726
Hrdějovice|České Budějovice|37361|49.019|14.4787
Hrejkovice|Písek|39859|49.4745|14.2909
Hrob|Teplice|41704|50.6593|13.7269
Hrobce|Litoměřice|41183|50.4626|14.2309
Hrobice|Pardubice|53352|50.1035|15.7889
Hrobice|Zlín|76315|49.2775|17.7883
Hrobčice|Teplice|41757|50.5174|13.7857
Hrochův Týnec|Chrudim|53862|49.9596|15.9106
Hromnice|Plzeň-sever|33011|49.8492|13.4416
Hronov|Náchod|54931|50.4802|16.1818
Hrotovice|Třebíč|67555|49.1078|16.0608
Hroubovice|Chrudim|53854|49.8826|15.9908
Hroznatín|Třebíč|67505|49.2978|15.9084
Hroznová Lhota|Hodonín|69663|48.9079|17.4171
Hroznětín|Karlovy Vary|36233|50.3095|12.8719
Hrubá Skála|Semily|51101|50.5449|15.2003
Hrubá Vrbka|Hodonín|69673|48.872|17.4771
Hrubý Jeseník|Nymburk|28932|50.2512|15.0942
Hrubčice|Prostějov|79821|49.4501|17.1932
Hrusice|Praha-východ|25166|49.91|14.7382
Hrutov|Jihlava|67527|49.2555|15.6803
Hruška|Prostějov|79827|49.3589|17.2268
Hrušky|Břeclav|69156|48.7928|16.9742
Hrušky|Vyškov|68352|49.1293|16.8336
Hrušov|Mladá Boleslav|29473|50.345|14.8465
Hrušovany|Chomutov|43143|50.3874|13.4985
Hrušovany nad Jevišovkou|Znojmo|67167|48.83|16.4028
Hrušovany u Brna|Brno-venkov|66462|49.0387|16.5944
Hrušová|Ústí nad Orlicí|56555|49.9136|16.1978
Hrádek|Znojmo|67127|48.7729|16.2683
Hrádek|Hradec Králové|50315|50.2187|15.6757
Hrádek|Frýdek-Místek|73997|49.6167|18.7373
Hrádek|Ústí nad Orlicí|56201|49.9683|16.3384
Hrádek|Klatovy|34201|49.2614|13.4986
Hrádek|Rokycany|33842|49.71|13.6542
Hrádek nad Nisou|Liberec|46334|50.8529|14.8447
Hrčava|Frýdek-Místek|73998|49.5201|18.8332
Hubenov|Jihlava|58805|49.3922|15.4691
Hudlice|Beroun|26703|49.9611|13.9707
Hudčice|Příbram|26272|49.5318|13.9226
Hukvaldy|Frýdek-Místek|73946|49.6239|18.222
Hulice|Benešov|25763|49.7097|15.0877
Hulín|Kroměříž|76824|49.317|17.4638
Humburky|Hradec Králové|50401|50.2261|15.5116
Humpolec|Pelhřimov|39601|49.5416|15.3594
Huntířov|Děčín|40502|50.7895|14.3035
Hurtova Lhota|Havlíčkův Brod|58001|49.5965|15.5089
Husinec|Prachatice|38421|49.0551|13.9871
Husinec|Praha-východ|25068|50.1738|14.3752
Huslenky|Vsetín|75602|49.3033|18.0905
Hustopeče|Břeclav|69301|48.9409|16.7377
Hustopeče nad Bečvou|Přerov|75366|49.5306|17.87
Husí Lhota|Mladá Boleslav|29406|50.4356|15.0048
Hutisko-Solanec|Vsetín|75662|49.4296|18.2178
Huzová|Olomouc|79351|49.8201|17.2981
Huštěnovice|Uherské Hradiště|68703|49.1083|17.4646
Hvozd|Prostějov|79855|49.6363|16.9102
Hvozd|Plzeň-sever|33101|49.9398|13.2632
Hvozd|Rakovník|27035|50.0516|13.6985
Hvozdec|České Budějovice|37372|48.9924|14.6274
Hvozdec|Brno-venkov|66471|49.247|16.4253
Hvozdec|Beroun|26762|49.8072|13.8804
Hvozdnice|Hradec Králové|50327|50.1914|15.7113
Hvozdnice|Praha-západ|25205|49.8726|14.3712
Hvozdná|Zlín|76311|49.2486|17.7517
Hvožďany|Domažlice|34522|49.5057|12.7714
Hvožďany|Příbram|26244|49.5284|13.8052
Hvězdlice|Vyškov|68341|49.1935|17.0836
Hvězdonice|Benešov|25724|49.8729|14.7774
Hvězdoňovice|Třebíč|67521|49.22|15.7623
Hybrálec|Jihlava|58601|49.4096|15.5892
Hynčice|Náchod|54983|50.6238|16.2854
Hynčina|Šumperk|78901|49.8489|16.7931
Háj u Duchcova|Teplice|41722|50.6309|13.7127
Háj ve Slezsku|Opava|74792|49.8998|18.09
Háje|Příbram|26101|49.6727|14.0475
Háje nad Jizerou|Semily|51301|50.6132|15.4213
Hájek|Strakonice|38773|49.1112|14.0613
Hájek|Karlovy Vary|36301|50.2832|12.9198
Hýskov|Beroun|26706|49.9908|14.0507
Hýsly|Hodonín|69650|49.0234|17.1799
Hřebeč|Kladno|27345|50.1361|14.1646
Hřebečníky|Rakovník|27041|49.9846|13.7533
Hředle|Beroun|26751|49.9039|13.9207
Hředle|Rakovník|27008|50.1881|13.7495
Hřensko|Děčín|40717|50.8745|14.2426
Hřibiny-Ledská|Rychnov nad Kněžnou|51741|50.1481|16.176
Hřibojedy|Trutnov|54401|50.3922|15.8348
Hřiměždice|Příbram|26214|49.687|14.275
Hřivice|Louny|43965|50.2882|13.7303
Hřivínův Újezd|Zlín|76307|49.1211|17.6904
Hříšice|Jindřichův Hradec|38001|49.1034|15.4955
Hříškov|Louny|43904|50.2914|13.8644
Hůrky|Rokycany|33701|49.746|13.6832
Hůry|České Budějovice|37371|49.0066|14.5412
Ivanovice na Hané|Vyškov|68323|49.3055|17.0935
Ivančice|Brno-venkov|66491|49.1015|16.3776
Ivaň|Brno-venkov|69123|48.9298|16.5758
Ivaň|Prostějov|79823|49.4247|17.2515
Jabkenice|Mladá Boleslav|29445|50.3242|15.0149
Jablonec nad Jizerou|Semily|51243|50.7036|15.4297
Jablonec nad Nisou|Jablonec nad Nisou|46601|50.7222|15.1704
Jablonná|Příbram|26263|49.6611|14.1385
Jablonné nad Orlicí|Ústí nad Orlicí|56164|50.0297|16.6007
Jablonné v Podještědí|Liberec|47125|50.7654|14.7606
Jabloňany|Blansko|67901|49.4657|16.6061
Jabloňov|Žďár nad Sázavou|59401|49.3241|16.0898
Jablunkov|Frýdek-Místek|73991|49.5768|18.7647
Jablůnka|Vsetín|75623|49.3837|17.9503
Jahodov|Rychnov nad Kněžnou|51601|50.1504|16.3335
Jakartovice|Opava|74753|49.9152|17.6841
Jakubov u Moravských Budějovic|Třebíč|67544|49.0811|15.7615
Jakubovice|Šumperk|78991|49.9944|16.8289
Jakubčovice nad Odrou|Nový Jičín|74236|49.6951|17.7878
Jalubí|Uherské Hradiště|68705|49.1164|17.428
Jamné|Jihlava|58827|49.4312|15.7239
Jamné nad Orlicí|Ústí nad Orlicí|56165|50.0397|16.633
Jamolice|Znojmo|67201|49.0724|16.2538
Jankov|České Budějovice|37384|48.9665|14.298
Jankov|Pelhřimov|39301|49.4152|15.3863
Jankov|Benešov|25703|49.653|14.7308
Jankovice|Pardubice|53501|50.0077|15.5293
Jankovice|Kroměříž|76901|49.3564|17.6187
Jankovice|Uherské Hradiště|68704|49.1542|17.3886
Janoušov|Šumperk|78991|50.0132|16.8452
Janov|Rychnov nad Kněžnou|51801|50.3324|16.2519
Janov|Bruntál|79384|50.2449|17.4813
Janov|Svitavy|56955|49.8409|16.3853
Janov|Rakovník|27006|50.2105|13.6399
Janov|Děčín|40502|50.8603|14.2654
Janov nad Nisou|Jablonec nad Nisou|46811|50.7721|15.1692
Janovice|Frýdek-Místek|73911|49.6215|18.4061
Janovice nad Úhlavou|Klatovy|34021|49.3453|13.2182
Janovice v Podještědí|Liberec|46353|50.763|14.8243
Janová|Vsetín|75501|49.3121|18.0202
Janská|Děčín|40502|50.8046|14.3636
Janské Lázně|Trutnov|54225|50.6312|15.7819
Janův Důl|Liberec|46352|50.7047|14.9404
Janůvky|Svitavy|56943|49.6717|16.5922
Jarcová|Vsetín|75701|49.4446|17.966
Jarohněvice|Kroměříž|76801|49.2672|17.3777
Jaroměř|Náchod|55101|50.3569|15.9242
Jaroměřice|Svitavy|56944|49.6257|16.752
Jaroměřice nad Rokytnou|Třebíč|67551|49.0942|15.8934
Jaroslav|Pardubice|53401|50.0123|16.078
Jaroslavice|Znojmo|67128|48.7567|16.2336
Jarov|Plzeň-jih|33501|49.5212|13.5077
Jarov|Plzeň-sever|33151|49.8726|13.4744
Jarošov|Svitavy|56966|49.8249|16.1635
Jarošov nad Nežárkou|Jindřichův Hradec|37841|49.19|15.0674
Jarpice|Kladno|27372|50.3217|14.0853
Jasenice|Třebíč|67571|49.2582|16.1637
Jasenná|Náchod|55222|50.3184|15.9911
Jasenná|Zlín|76313|49.2535|17.8943
Javor|Klatovy|34021|49.3255|13.2475
Javorek|Žďár nad Sázavou|59203|49.6503|16.1739
Javornice|Rychnov nad Kněžnou|51711|50.1715|16.3494
Javorník|Hodonín|69674|48.8622|17.5335
Javorník|Jeseník|79070|50.3909|17.0028
Javorník|Svitavy|56802|49.7828|16.4275
Javorník|Ústí nad Orlicí|56601|49.8896|16.1561
Javorník|Benešov|25763|49.6866|15.0266
Javůrek|Brno-venkov|66483|49.2556|16.3623
Jedlany|Tábor|39137|49.4947|14.7165
Jedlová|Svitavy|56991|49.6611|16.3062
Jedlá|Havlíčkův Brod|58401|49.7382|15.2344
Jedlí|Šumperk|78901|49.9313|16.7948
Jedomělice|Kladno|27378|50.2331|13.9724
Jedousov|Pardubice|53501|49.9955|15.6103
Jedovnice|Blansko|67906|49.3446|16.7561
Jehnědí|Ústí nad Orlicí|56201|49.9711|16.31
Jemnice|Třebíč|67531|49.0191|15.57
Jemníky|Kladno|27401|50.2076|14.1191
Jeneč|Praha-západ|25261|50.0874|14.2149
Jenišov|Karlovy Vary|36001|50.2266|12.8
Jenišovice|Jablonec nad Nisou|46833|50.6278|15.1366
Jenišovice|Chrudim|53864|49.9296|16.0311
Jeníkov|Chrudim|53901|49.7426|15.9574
Jeníkov|Teplice|41724|50.6287|13.749
Jeníkovice|Hradec Králové|50346|50.2283|16.0027
Jeníkovice|Pardubice|53501|49.9816|15.6606
Jenčice|Litoměřice|41115|50.483|14.0045
Jenštejn|Praha-východ|25073|50.1528|14.6119
Jersín|Jihlava|58825|49.4214|15.8308
Jesenec|Prostějov|79853|49.6085|16.8622
Jesenice|Praha-západ|25242|49.9682|14.5136
Jesenice|Příbram|26401|49.6078|14.4782
Jesenice|Rakovník|27033|50.0971|13.4696
Jesenný|Semily|51212|50.6606|15.3385
Jeseník|Jeseník|79001|50.2247|17.1981
Jeseník nad Odrou|Nový Jičín|74233|49.612|17.9054
Jestřabí|Zlín|76333|49.0681|17.956
Jestřabí Lhota|Kolín|28002|50.0899|15.2618
Jestřabí v Krkonoších|Semily|51401|50.6806|15.4918
Jestřebí|Náchod|54901|50.3622|16.1822
Jestřebí|Česká Lípa|47161|50.6087|14.5847
Jestřebí|Šumperk|78901|49.8522|16.8687
Jetětice|Písek|39848|49.3861|14.2927
Jetřichov|Náchod|54983|50.6151|16.2668
Jetřichovice|Děčín|40716|50.8525|14.394
Jevany|Praha-východ|28166|49.9707|14.8106
Jeviněves|Mělník|27705|50.3452|14.3382
Jevišovice|Znojmo|67153|48.9875|15.99
Jevišovka|Břeclav|69183|48.8287|16.4663
Jevíčko|Svitavy|56943|49.6323|16.7114
Jezbořice|Pardubice|53002|49.9807|15.6948
Jezdkovice|Opava|74755|49.9231|17.7749
Jezdovice|Jihlava|58901|49.3232|15.4843
Jezernice|Přerov|75131|49.5479|17.625
Jezeřany-Maršovice|Znojmo|67175|49.0289|16.4374
Jeřice|Jičín|50801|50.3447|15.6809
Jeřišno|Havlíčkův Brod|58274|49.7925|15.6418
Jeřmanice|Liberec|46312|50.6997|15.0939
Ješetice|Benešov|25789|49.5813|14.6102
Ježená|Jihlava|58841|49.4164|15.4657
Ježkovice|Vyškov|68304|49.2981|16.8926
Ježov|Hodonín|69648|49.0271|17.2101
Ježov|Pelhřimov|39601|49.6131|15.2338
Ježovy|Klatovy|34012|49.4912|13.2285
Jickovice|Písek|39901|49.4507|14.216
Jihlava|Jihlava|58601|49.4159|15.5955
Jihlávka|Jihlava|58851|49.2612|15.2926
Jilem|Jindřichův Hradec|37853|49.1768|15.2689
Jilem|Havlíčkův Brod|58301|49.7135|15.5835
Jilemnice|Semily|51401|50.609|15.5066
Jimlín|Louny|44001|50.3204|13.7473
Jimramov|Žďár nad Sázavou|59242|49.6373|16.2264
Jinačovice|Brno-venkov|66434|49.2679|16.5296
Jince|Příbram|26223|49.7863|13.9788
Jindřichov|Bruntál|79383|50.2519|17.5191
Jindřichov|Přerov|75301|49.6447|17.7483
Jindřichov|Šumperk|78823|50.0959|16.985
Jindřichovice|Sokolov|35801|50.2828|12.6024
Jindřichovice|Jihlava|67526|49.1377|15.6387
Jindřichovice pod Smrkem|Liberec|46365|50.9609|15.2496
Jindřichův Hradec|Jindřichův Hradec|37701|49.1446|15.0062
Jinolice|Jičín|50601|50.4786|15.3298
Jinočany|Praha-západ|25225|50.0329|14.2688
Jinošov|Třebíč|67571|49.2315|16.1936
Jinín|Strakonice|38601|49.2279|13.9827
Jiratice|Třebíč|67532|48.9832|15.6129
Jirkov|Chomutov|43111|50.5006|13.4489
Jirny|Praha-východ|25090|50.1159|14.6993
Jistebnice|Tábor|39133|49.4856|14.5277
Jistebník|Nový Jičín|74282|49.7541|18.1307
Jitkov|Havlíčkův Brod|58301|49.6623|15.7274
Jivina|Beroun|26762|49.7942|13.8365
Jivina|Mladá Boleslav|29414|50.5542|14.9473
Jivno|České Budějovice|37371|48.9956|14.5693
Jizbice|Nymburk|28802|50.2578|14.994
Jizerní Vtelno|Mladá Boleslav|29431|50.3695|14.8533
Jičín|Jičín|50601|50.4354|15.3611
Jičíněves|Jičín|50731|50.3732|15.3374
Jiřetín pod Bukovou|Jablonec nad Nisou|46843|50.7558|15.263
Jiřetín pod Jedlovou|Děčín|40756|50.8746|14.5752
Jiřice|Pelhřimov|39601|49.5533|15.3184
Jiřice|Nymburk|28922|50.2525|14.837
Jiřice u Miroslavi|Znojmo|67178|48.9209|16.3921
Jiřice u Moravských Budějovic|Znojmo|67154|48.994|15.9255
Jiříkov|Bruntál|79351|49.854|17.2777
Jiříkov|Děčín|40753|50.9935|14.5684
Jiříkovice|Brno-venkov|66451|49.1668|16.7581
Josefov|Hodonín|69621|48.8396|17.0101
Josefov|Sokolov|35709|50.2116|12.5795
Josefův Důl|Jablonec nad Nisou|46844|50.782|15.2316
Josefův Důl|Mladá Boleslav|29307|50.4535|14.8938
Jáchymov|Karlovy Vary|36251|50.3586|12.9348
Jámy|Žďár nad Sázavou|59232|49.5304|16.0058
Jíkev|Nymburk|28932|50.2645|15.0601
Jílovice|České Budějovice|37332|48.8896|14.7269
Jílovice|Hradec Králové|51772|50.2507|16.0128
Jíloviště|Praha-západ|25202|49.9276|14.3428
Jílové|Děčín|40701|50.7609|14.1039
Jílové u Držkova|Jablonec nad Nisou|46822|50.671|15.2954
Jílové u Prahy|Praha-západ|25401|49.8955|14.4934
Jívka|Trutnov|54213|50.5351|16.1091
Jívová|Olomouc|78316|49.7093|17.3947
Jívoví|Žďár nad Sázavou|59451|49.4055|16.0908
KARVINÁ|Karviná|73301|49.8568|18.5433
Kacanovy|Semily|51101|50.5508|15.1454
Kaceřov|Sokolov|35751|50.1489|12.5045
Kaceřov|Plzeň-sever|33151|49.8707|13.5128
Kacákova Lhota|Jičín|50601|50.4096|15.4193
Kadaň|Chomutov|43201|50.3761|13.2714
Kadlín|Mělník|27735|50.3996|14.6998
Kadolec|Žďár nad Sázavou|59451|49.3748|16.1418
Kadov|Strakonice|38733|49.4028|13.7749
Kadov|Znojmo|67201|48.9829|16.2875
Kadov|Žďár nad Sázavou|59203|49.6327|16.0793
Kakejcov|Rokycany|33843|49.667|13.6243
Kalek|Chomutov|43132|50.5778|13.3221
Kalenice|Strakonice|38716|49.2717|13.7168
Kalhov|Jihlava|58842|49.4811|15.4415
Kalivody|Rakovník|27054|50.2085|13.842
Kaliště|Jihlava|58851|49.2414|15.3014
Kaliště|Pelhřimov|39451|49.5927|15.3042
Kaliště|Praha-východ|25165|49.8828|14.7746
Kaly|Brno-venkov|59455|49.3794|16.3517
Kamberk|Benešov|25706|49.5972|14.8404
Kamenec|Rokycany|33828|49.8812|13.5963
Kamenec u Poličky|Svitavy|57201|49.708|16.2338
Kamenice|Jihlava|58823|49.3667|15.7803
Kamenice|Praha-východ|25168|49.9016|14.5825
Kamenice nad Lipou|Pelhřimov|39470|49.3031|15.0753
Kamenický Šenov|Česká Lípa|47114|50.7737|14.473
Kameničky|Chrudim|53941|49.736|15.9751
Kameničná|Ústí nad Orlicí|56401|50.1203|16.435
Kamenná|České Budějovice|37401|48.7799|14.6712
Kamenná|Jihlava|58813|49.51|15.6527
Kamenná|Třebíč|67503|49.2725|16.0605
Kamenná|Šumperk|78974|49.8594|17.0311
Kamenná Horka|Svitavy|56802|49.738|16.524
Kamenná Lhota|Havlíčkův Brod|58292|49.6439|15.2753
Kamenné Zboží|Nymburk|28802|50.193|14.9995
Kamenné Žehrovice|Kladno|27301|50.1271|14.0182
Kamenný Malíkov|Jindřichův Hradec|37842|49.212|15.1224
Kamenný Most|Kladno|27326|50.2415|14.2058
Kamenný Přívoz|Praha-západ|25282|49.8631|14.5035
Kamenný Újezd|České Budějovice|37381|48.8976|14.4465
Kamenný Újezd|Rokycany|33701|49.7238|13.6189
Kamýk|Litoměřice|41201|50.5585|14.0775
Kamýk nad Vltavou|Příbram|26263|49.6391|14.2535
Kanice|Brno-venkov|66401|49.2638|16.7146
Kanice|Domažlice|34543|49.4751|13.0728
Kanina|Mělník|27735|50.4248|14.6
Kaničky|Domažlice|34543|49.4744|13.1454
Kaplice|Český Krumlov|38241|48.7386|14.4964
Kardašova Řečice|Jindřichův Hradec|37821|49.1849|14.8533
Karle|Svitavy|56802|49.7661|16.3648
Karlov|Žďár nad Sázavou|59101|49.6471|15.9145
Karlova Studánka|Bruntál|79324|50.0732|17.307
Karlova Ves|Rakovník|27023|49.9874|13.8625
Karlovice|Semily|51101|50.5618|15.2073
Karlovice|Bruntál|79326|50.1057|17.4457
Karlovice|Zlín|76302|49.1765|17.5859
Karlovy Vary|Karlovy Vary|36001|50.232|12.8721
Karlík|Praha-západ|25229|49.9355|14.2596
Karlín|Hodonín|69614|48.9759|16.9774
Karlštejn|Beroun|26718|49.9396|14.1881
Karolinka|Vsetín|75605|49.3514|18.2402
Karolín|Kroměříž|76821|49.2307|17.4346
Kasalice|Pardubice|53341|50.1181|15.6098
Kasejovice|Plzeň-jih|33544|49.4628|13.7407
Kateřinice|Nový Jičín|74258|49.6693|18.1883
Kateřinice|Vsetín|75621|49.3822|17.8859
Katov|Tábor|39201|49.2818|14.8286
Katov|Brno-venkov|59455|49.3328|16.2789
Katovice|Strakonice|38711|49.2736|13.8305
Katusice|Mladá Boleslav|29425|50.4452|14.7775
Kaznějov|Plzeň-sever|33151|49.8932|13.3831
Kačice|Kladno|27304|50.1627|13.9883
Kačlehy|Jindřichův Hradec|37701|49.109|15.0772
Kaňovice|Frýdek-Místek|73936|49.7444|18.3962
Kaňovice|Zlín|76341|49.1092|17.6989
Kařez|Rokycany|33808|49.8244|13.7817
Kařízek|Rokycany|33808|49.8135|13.7997
Kašava|Zlín|76319|49.2955|17.7858
Kašnice|Břeclav|69172|48.9965|16.8829
Kašperské Hory|Klatovy|34192|49.143|13.5563
Kbel|Plzeň-jih|34012|49.4938|13.3657
Kbel|Kolín|28002|49.9883|15.1436
Kbelany|Plzeň-sever|33023|49.7324|13.1264
Kbelnice|Jičín|50601|50.4549|15.3507
Kdousov|Třebíč|67532|48.9861|15.6474
Kdyně|Domažlice|34506|49.3903|13.0406
Keblice|Litoměřice|41002|50.4801|14.1019
Keblov|Benešov|25765|49.6777|15.072
Kejnice|Klatovy|34101|49.267|13.6943
Kejžlice|Pelhřimov|39452|49.5906|15.3927
Kelníky|Zlín|76307|49.111|17.6448
Kelč|Vsetín|75643|49.4785|17.8154
Kelčany|Hodonín|69649|49.0053|17.1739
Kestřany|Písek|39821|49.2692|14.0726
Ketkovice|Brno-venkov|66491|49.1592|16.2626
Klabava|Rokycany|33841|49.7535|13.5394
Kladeruby|Vsetín|75643|49.4928|17.8653
Kladeruby nad Oslavou|Třebíč|67575|49.1449|16.1719
Kladky|Prostějov|79854|49.6502|16.8414
Kladno|Chrudim|53901|49.7726|15.9824
Kladno|Kladno|27201|50.1418|14.1068
Kladníky|Přerov|75131|49.4838|17.603
Kladruby|Strakonice|38716|49.2688|13.7636
Kladruby|Rokycany|33808|49.913|13.6318
Kladruby|Tachov|34961|49.7154|12.98
Kladruby|Benešov|25801|49.7233|14.9502
Kladruby|Teplice|41501|50.6151|13.8264
Kladruby nad Labem|Pardubice|53314|50.0578|15.4872
Klamoš|Hradec Králové|50351|50.1257|15.5014
Klapý|Litoměřice|41116|50.4315|14.0066
Klatovec|Jihlava|58851|49.2225|15.2948
Klatovy|Klatovy|33901|49.3957|13.2952
Klec|Jindřichův Hradec|37901|49.0994|14.7485
Klecany|Praha-východ|25067|50.1761|14.4116
Kleneč|Litoměřice|41301|50.3927|14.2488
Klenovice|Tábor|39201|49.2789|14.7158
Klenovice na Hané|Prostějov|79823|49.403|17.2112
Klenová|Klatovy|34021|49.3335|13.2333
Klentnice|Břeclav|69201|48.8447|16.6448
Klenčí pod Čerchovem|Domažlice|34534|49.4349|12.8148
Klešice|Chrudim|53803|49.9637|15.6814
Klimkovice|Ostrava-město|74283|49.7882|18.126
Klobouky u Brna|Břeclav|69172|48.9951|16.8596
Klobuky|Kladno|27374|50.2941|13.9876
Klokočná|Praha-východ|25164|49.9585|14.7186
Klokočov|Havlíčkův Brod|58301|49.8018|15.6743
Klokočí|Semily|51101|50.5998|15.2217
Klokočí|Přerov|75361|49.5603|17.6824
Klopina|Šumperk|78973|49.8187|17.0195
Klopotovice|Prostějov|79821|49.4462|17.2509
Kluky|Písek|39819|49.3169|14.2454
Kluky|Kutná Hora|28545|49.9076|15.3254
Kluky|Mladá Boleslav|29426|50.4403|14.7253
Klučenice|Příbram|26256|49.5532|14.2121
Klučov|Třebíč|67552|49.1671|15.9352
Klučov|Kolín|28201|50.0951|14.9102
Kly|Mělník|27741|50.3089|14.5016
Klášter|Plzeň-jih|33501|49.502|13.5768
Klášter Hradiště nad Jizerou|Mladá Boleslav|29415|50.5235|14.9448
Klášterec nad Ohří|Chomutov|43151|50.3846|13.1714
Klášterec nad Orlicí|Ústí nad Orlicí|56182|50.1117|16.5546
Klášterní Skalice|Kolín|28163|50.0236|14.9854
Klášterská Lhota|Trutnov|54371|50.5598|15.6637
Klínec|Praha-západ|25210|49.901|14.3434
Klíny|Most|43601|50.6383|13.5482
Klíčany|Praha-východ|25069|50.2021|14.4346
Kmetiněves|Kladno|27322|50.3093|14.1571
Knovíz|Kladno|27401|50.2127|14.1371
Knyk|Havlíčkův Brod|58001|49.647|15.5787
Knínice|Jihlava|58856|49.0941|15.6042
Knínice u Boskovic|Blansko|67934|49.5397|16.6951
Kněždub|Hodonín|69664|48.8868|17.3956
Kněževes|Blansko|67974|49.5871|16.4239
Kněževes|Žďár nad Sázavou|59444|49.4566|15.9809
Kněževes|Praha-západ|25268|50.1213|14.2592
Kněževes|Rakovník|27001|50.1467|13.6372
Kněžice|Jihlava|67529|49.2709|15.6723
Kněžice|Chrudim|53843|49.8619|15.5275
Kněžice|Nymburk|28902|50.2573|15.3355
Kněžičky|Nymburk|28908|50.174|15.3449
Kněžmost|Mladá Boleslav|29402|50.4893|15.0384
Kněžnice|Jičín|50601|50.4933|15.3225
Kněžpole|Uherské Hradiště|68712|49.0986|17.5168
Koberovice|Pelhřimov|39601|49.5877|15.263
Koberovy|Jablonec nad Nisou|46822|50.6248|15.2283
Kobeřice|Opava|74727|49.9856|18.0522
Kobeřice u Brna|Vyškov|68401|49.0923|16.8859
Kobylice|Hradec Králové|50401|50.2459|15.5872
Kobylnice|Brno-venkov|66451|49.1381|16.7319
Kobylnice|Kutná Hora|28401|50.0064|15.3758
Kobylnice|Mladá Boleslav|29446|50.3717|15.054
Kobyly|Liberec|46345|50.6103|15.0044
Kobylá nad Vidnavkou|Jeseník|79065|50.342|17.1237
Kobylí|Břeclav|69110|48.933|16.8917
Kocbeře|Trutnov|54464|50.4538|15.8588
Kocelovice|Strakonice|38742|49.4652|13.8277
Kochánky|Mladá Boleslav|29474|50.2771|14.7803
Kochánov|Havlíčkův Brod|58253|49.5343|15.5403
Koclířov|Svitavy|56911|49.7664|16.5399
Kohoutov|Trutnov|54401|50.4514|15.9049
Kojatice|Třebíč|67532|48.9989|15.7032
Kojatín|Třebíč|67503|49.2427|16.0103
Kojetice|Třebíč|67523|49.1579|15.8181
Kojetice|Mělník|25072|50.2382|14.5086
Kojetín|Havlíčkův Brod|58001|49.6572|15.6582
Kojetín|Přerov|75201|49.3529|17.3037
Kojice|Pardubice|53312|50.0431|15.3867
Kojátky|Vyškov|68501|49.1719|17.0262
Kojčice|Pelhřimov|39409|49.4761|15.256
Kokašice|Tachov|34952|49.8784|12.9473
Kokory|Přerov|75105|49.4949|17.3755
Kokořín|Mělník|27723|50.43|14.5673
Kolaje|Nymburk|28904|50.1555|15.2385
Koldín|Ústí nad Orlicí|56501|50.0369|16.2517
Koleč|Kladno|27329|50.1989|14.2235
Kolešov|Rakovník|27004|50.1573|13.5101
Kolešovice|Rakovník|27002|50.1397|13.6104
Kolinec|Klatovy|34142|49.2991|13.4391
Kolomuty|Mladá Boleslav|29301|50.4022|14.9791
Koloveč|Domažlice|34543|49.4869|13.1089
Kolová|Karlovy Vary|36001|50.1875|12.9034
Kolín|Kolín|28002|50.0274|15.2028
Kolšov|Šumperk|78821|49.9032|16.9475
Komařice|České Budějovice|37314|48.8785|14.5458
Komorní Lhotka|Frýdek-Místek|73953|49.6582|18.5279
Komorovice|Pelhřimov|39601|49.5088|15.3456
Komořany|Vyškov|68301|49.2164|16.9069
Komárno|Kroměříž|76871|49.4347|17.7805
Komárov|Tábor|39201|49.2502|14.5941
Komárov|Olomouc|78501|49.7642|17.2411
Komárov|Beroun|26762|49.8066|13.8565
Komárov|Zlín|76361|49.1508|17.5689
Komárovice|Třebíč|67526|49.0701|15.7011
Komňa|Uherské Hradiště|68771|48.9939|17.8009
Kondrac|Benešov|25801|49.6672|14.8846
Konecchlumí|Jičín|50705|50.4023|15.4803
Konice|Prostějov|79852|49.5904|16.8892
Konojedy|Praha-východ|28163|49.9487|14.8514
Konstantinovy Lázně|Tachov|34952|49.8813|12.978
Konárovice|Kolín|28125|50.0416|15.2843
Koněprusy|Beroun|26601|49.921|14.0659
Konětopy|Praha-východ|27714|50.2765|14.6539
Koněšín|Třebíč|67502|49.1906|16.0413
Kopidlno|Jičín|50732|50.331|15.2704
Kopidlo|Plzeň-sever|33141|49.9433|13.4645
Kopřivnice|Nový Jičín|74221|49.5996|18.1449
Kopřivná|Šumperk|78833|50.0465|16.9469
Korkyně|Příbram|26206|49.7805|14.3514
Kornatice|Rokycany|33843|49.659|13.5923
Korno|Beroun|26727|49.9206|14.137
Korolupy|Znojmo|67107|48.9303|15.6463
Korouhev|Svitavy|56993|49.6714|16.2459
Koroužné|Žďár nad Sázavou|59301|49.5276|16.3477
Korozluky|Most|43401|50.4787|13.7231
Koruna|Svitavy|56301|49.8469|16.715
Koryta|Plzeň-sever|33151|49.9006|13.4749
Koryta|Mladá Boleslav|29411|50.5721|15.0118
Korytná|Uherské Hradiště|68752|48.9411|17.6653
Koryčany|Kroměříž|76805|49.1065|17.1644
Kosice|Hradec Králové|50351|50.1798|15.5349
Kosičky|Hradec Králové|50365|50.1787|15.5558
Kosmonosy|Mladá Boleslav|29306|50.4386|14.9299
Kosov|Šumperk|78901|49.8832|16.7988
Kosova Hora|Příbram|26291|49.6542|14.4718
Kosoř|Praha-západ|25226|49.9876|14.3267
Kosořice|Mladá Boleslav|29441|50.3335|14.9697
Kosořín|Ústí nad Orlicí|56501|49.9792|16.2338
Kostelany|Kroměříž|76701|49.2032|17.383
Kostelany nad Moravou|Uherské Hradiště|68601|49.0455|17.407
Kostelec|Hodonín|69651|49.0269|17.1533
Kostelec|Jihlava|58861|49.3614|15.4908
Kostelec|Jičín|50601|50.3813|15.3274
Kostelec|Tachov|34901|49.6744|13.0265
Kostelec na Hané|Prostějov|79841|49.5141|17.0583
Kostelec nad Labem|Mělník|27713|50.2266|14.5856
Kostelec nad Orlicí|Rychnov nad Kněžnou|51741|50.1225|16.2151
Kostelec nad Vltavou|Písek|39858|49.5|14.2119
Kostelec nad Černými Lesy|Praha-východ|28163|49.9941|14.8593
Kostelec u Heřmanova Městce|Chrudim|53803|49.9234|15.6516
Kostelec u Holešova|Kroměříž|76843|49.3742|17.5114
Kostelec u Křížků|Praha-východ|25168|49.9071|14.5573
Kostelecké Horky|Rychnov nad Kněžnou|51741|50.0518|16.207
Kostelní Hlavno|Praha-východ|29476|50.2575|14.6991
Kostelní Lhota|Nymburk|28912|50.1294|15.0243
Kostelní Myslová|Jihlava|58856|49.1479|15.429
Kostelní Radouň|Jindřichův Hradec|37842|49.2255|15.0088
Kostelní Vydří|Jindřichův Hradec|38001|49.1062|15.4218
Kostice|Břeclav|69152|48.7469|16.9788
Kostníky|Třebíč|67532|48.9748|15.6399
Kostomlaty nad Labem|Nymburk|28921|50.1846|14.9541
Kostomlaty pod Milešovkou|Teplice|41754|50.5602|13.8732
Kostomlaty pod Řípem|Litoměřice|41301|50.3831|14.3332
Kostomlátky|Nymburk|28921|50.1711|14.9841
Kostěnice|Pardubice|53002|50.0097|15.9038
Kotenčice|Příbram|26223|49.7364|14.0939
Kotlasy|Žďár nad Sázavou|59214|49.4928|15.9462
Kotopeky|Beroun|26801|49.8568|13.9253
Kotovice|Plzeň-jih|33301|49.6721|13.1546
Kotvrdovice|Blansko|67907|49.3552|16.7845
Kounice|Nymburk|28915|50.1078|14.856
Kounov|Rychnov nad Kněžnou|51792|50.2989|16.2582
Kounov|Rakovník|27006|50.213|13.6752
Koupě|Příbram|26272|49.5149|13.9185
Kout na Šumavě|Domažlice|34502|49.4027|13.0022
Kouty|Havlíčkův Brod|58401|49.6489|15.2931
Kouty|Třebíč|67508|49.3148|15.7928
Kouty|Nymburk|29001|50.1932|15.1489
Kouřim|Kolín|28161|50.0032|14.9771
Kovalovice|Brno-venkov|66406|49.2047|16.8191
Kovanec|Mladá Boleslav|29426|50.4178|14.7767
Kovanice|Nymburk|28802|50.1696|15.0709
Kovač|Jičín|50601|50.3961|15.4709
Koválovice-Osíčany|Prostějov|79829|49.2845|17.1713
Kováň|Mladá Boleslav|29425|50.4234|14.7779
Kovářov|Písek|39855|49.5177|14.2782
Kovářská|Chomutov|43186|50.4383|13.054
Kovčín|Klatovy|34101|49.4159|13.6067
Kozlany|Vyškov|68341|49.2042|17.0353
Kozlany|Třebíč|67502|49.1798|16.0613
Kozlov|Havlíčkův Brod|58401|49.7347|15.2931
Kozlov|Jihlava|58821|49.4131|15.7006
Kozlov|Olomouc|77200|49.6036|17.5357
Kozlov|Žďár nad Sázavou|59451|49.3792|16.0788
Kozlovice|Frýdek-Místek|73947|49.5905|18.2567
Kozlovice|Plzeň-jih|33501|49.4651|13.5829
Kozly|Česká Lípa|47001|50.6554|14.4569
Kozly|Louny|44001|50.4569|13.7846
Kozmice|Opava|74711|49.9129|18.156
Kozmice|Benešov|25601|49.8249|14.7962
Kozojedy|Jičín|50703|50.3165|15.3749
Kozojedy|Plzeň-sever|33141|49.9313|13.5425
Kozojedy|Praha-východ|28163|49.9967|14.8144
Kozojedy|Rakovník|27054|50.2554|13.8157
Kozojídky|Hodonín|69663|48.9187|17.3997
Kozolupy|Plzeň-sever|33032|49.7639|13.2522
Kozomín|Mělník|27745|50.2369|14.3712
Kozárov|Blansko|67971|49.4439|16.4588
Kozárovice|Příbram|26284|49.5556|14.1066
Kočov|Tachov|34815|49.8088|12.7367
Kočí|Chrudim|53861|49.9473|15.8556
Kočín|Plzeň-sever|33141|49.9305|13.4762
Kořenec|Blansko|68001|49.5304|16.754
Kořenice|Kolín|28002|49.9772|15.141
Kořenov|Jablonec nad Nisou|46849|50.7594|15.3654
Košařiska|Frýdek-Místek|73981|49.5895|18.6958
Košetice|Pelhřimov|39422|49.5585|15.1164
Košice|Tábor|39117|49.3254|14.7515
Košice|Kutná Hora|28504|49.8959|15.1509
Koštice|Louny|43921|50.4033|13.944
Košátky|Mladá Boleslav|29479|50.3153|14.6671
Košík|Nymburk|28935|50.3184|15.1342
Košíky|Uherské Hradiště|68704|49.1577|17.4163
Košín|Tábor|39137|49.4565|14.6585
Košťany|Teplice|41723|50.6552|13.7557
Košťálov|Semily|51202|50.5718|15.4041
Kožichovice|Třebíč|67401|49.2|15.922
Kožlany|Plzeň-sever|33144|49.994|13.5412
Kožlí|Písek|39804|49.5159|14.1468
Kožlí|Havlíčkův Brod|58293|49.6704|15.2533
Kožušany-Tážaly|Olomouc|78375|49.5378|17.2536
Kožušice|Vyškov|68333|49.1552|17.1849
Kraborovice|Havlíčkův Brod|58282|49.8006|15.572
Krabčice|Litoměřice|41187|50.4055|14.3014
Krahulov|Třebíč|67521|49.223|15.8082
Krahulčí|Jihlava|58856|49.1819|15.4149
Krajková|Sokolov|35709|50.2161|12.5342
Krajníčko|Strakonice|38773|49.1476|14.0288
Krakov|Rakovník|27035|50.0375|13.6476
Krakovany|Kolín|28127|50.0662|15.369
Krakovec|Rakovník|27035|50.0189|13.6383
Kralice na Hané|Prostějov|79812|49.4631|17.1806
Kralice nad Oslavou|Třebíč|67573|49.1994|16.2017
Kralovice|Plzeň-sever|33141|49.982|13.4876
Kralupy nad Vltavou|Mělník|27801|50.2417|14.3107
Kramolna|Náchod|54701|50.4208|16.1349
Kramolín|Třebíč|67577|49.1343|16.132
Kramolín|Plzeň-jih|33501|49.4462|13.5771
Kraselov|Strakonice|38716|49.2279|13.8041
Kraslice|Sokolov|35801|50.3238|12.5176
Krasonice|Jihlava|58864|49.1151|15.6161
Krasov|Bruntál|79401|50.0919|17.5462
Krasová|Blansko|67906|49.3615|16.768
Krasíkov|Ústí nad Orlicí|56301|49.8557|16.6958
Krasíkovice|Pelhřimov|39301|49.4617|15.2288
Kratochvilka|Brno-venkov|66491|49.1568|16.3765
Kratonohy|Hradec Králové|50324|50.1692|15.607
Kratušín|Prachatice|38301|49.0204|13.9286
Kravaře|Česká Lípa|47103|50.6325|14.3925
Kravaře|Opava|74721|49.9321|18.0048
Kravsko|Znojmo|67151|48.9216|15.9864
Krašlovice|Strakonice|38901|49.1667|14.1326
Krašovice|Plzeň-sever|33013|49.8724|13.3054
Krchleby|Rychnov nad Kněžnou|51741|50.0792|16.2346
Krchleby|Šumperk|78901|49.8208|16.8337
Krchleby|Kutná Hora|28601|49.889|15.3504
Krchleby|Nymburk|28802|50.2393|15.0228
Krejnice|Strakonice|38716|49.2338|13.7186
Krhanice|Benešov|25742|49.8561|14.5575
Krhov|Blansko|67901|49.4604|16.5839
Krhov|Třebíč|67555|49.1004|16.0195
Krhovice|Znojmo|67128|48.8159|16.1737
Krhová|Vsetín|75701|49.4652|17.9743
Krmelín|Frýdek-Místek|73924|49.7292|18.2355
Krnov|Bruntál|79401|50.0907|17.7032
Krnsko|Mladá Boleslav|29431|50.3725|14.8632
Krokočín|Třebíč|67571|49.2442|16.2331
Krompach|Česká Lípa|47157|50.8282|14.7016
Kroměříž|Kroměříž|76701|49.2918|17.3995
Kropáčova Vrutice|Mladá Boleslav|29479|50.3306|14.7175
Krouna|Chrudim|53943|49.7725|16.0268
Kroučová|Rakovník|27054|50.2069|13.7841
Krsy|Plzeň-sever|33038|49.9263|13.0551
Krtov|Tábor|39201|49.3486|14.8326
Krty|Rakovník|27033|50.0917|13.432
Krty-Hradec|Strakonice|38601|49.2914|13.8481
Krucemburk|Havlíčkův Brod|58266|49.6885|15.8522
Kruh|Semily|51401|50.5656|15.4802
Krumsín|Prostějov|79803|49.446|17.0016
Krumvíř|Břeclav|69173|48.9891|16.9104
Krupka|Teplice|41741|50.6846|13.8583
Krupá|Kolín|28163|50.0175|14.8714
Krupá|Rakovník|27009|50.175|13.7317
Krušovice|Rakovník|27053|50.1724|13.7752
Kružberk|Opava|74786|49.8319|17.6833
Krychnov|Kolín|28002|50.0061|15.0578
Kryry|Louny|43981|50.1745|13.4267
Kryštofovo Údolí|Liberec|46001|50.7745|14.9335
Kryštofovy Hamry|Chomutov|43191|50.4996|13.1362
Králova Lhota|Písek|39804|49.4958|14.1107
Králova Lhota|Rychnov nad Kněžnou|51771|50.2947|15.9989
Královec|Trutnov|54203|50.6769|15.9738
Královice|Kladno|27401|50.2631|14.0559
Královské Poříčí|Sokolov|35601|50.1941|12.6795
Králíky|Hradec Králové|50401|50.2595|15.5367
Králíky|Ústí nad Orlicí|56169|50.0839|16.7606
Králův Dvůr|Beroun|26701|49.9499|14.0346
Krásensko|Vyškov|68304|49.3646|16.83
Krásno|Sokolov|35731|50.1093|12.7863
Krásná|Cheb|35201|50.2349|12.1681
Krásná|Frýdek-Místek|73904|49.5821|18.4815
Krásná Hora|Havlíčkův Brod|58234|49.6028|15.4704
Krásná Hora nad Vltavou|Příbram|26256|49.6047|14.2775
Krásná Lípa|Děčín|40746|50.9131|14.5101
Krásná Ves|Mladá Boleslav|29425|50.4248|14.7922
Krásné|Žďár nad Sázavou|59203|49.678|16.1451
Krásné|Chrudim|53825|49.8217|15.7456
Krásné Údolí|Karlovy Vary|36401|50.0724|12.9214
Krásný Dvůr|Louny|43972|50.2543|13.3679
Krásný Les|Karlovy Vary|36301|50.345|13.0029
Krásný Les|Liberec|46401|50.9403|15.1277
Krásněves|Žďár nad Sázavou|59444|49.4445|15.9813
Krátká Ves|Havlíčkův Brod|58222|49.6258|15.6846
Krátošice|Tábor|39201|49.326|14.7868
Krčmaň|Olomouc|77900|49.5208|17.3443
Krňany|Benešov|25744|49.8449|14.4776
Ktiš|Prachatice|38403|48.9171|14.1328
Ktová|Semily|51263|50.5199|15.2468
Kublov|Beroun|26741|49.9438|13.8768
Kubova Huť|Prachatice|38501|48.9833|13.7719
Kubšice|Znojmo|67176|49.0008|16.4132
Kuchařovice|Znojmo|66902|48.8761|16.0771
Kudlovice|Uherské Hradiště|68703|49.1318|17.4573
Kujavy|Nový Jičín|74245|49.7034|17.9726
Kukle|Svitavy|56802|49.7932|16.4257
Kuklík|Žďár nad Sázavou|59203|49.63|16.1132
Kuks|Trutnov|54443|50.4016|15.8883
Kulířov|Blansko|67906|49.3794|16.8469
Kundratice|Žďár nad Sázavou|59451|49.4027|16.1343
Kunemil|Havlíčkův Brod|58291|49.7076|15.4316
Kunice|Blansko|67971|49.4789|16.4908
Kunice|Praha-východ|25163|49.9367|14.6716
Kuničky|Blansko|67902|49.435|16.6815
Kunkovice|Kroměříž|76813|49.1828|17.1744
Kunovice|Uherské Hradiště|68604|49.0451|17.4702
Kunovice|Vsetín|75644|49.4443|17.81
Kunratice|Liberec|46401|50.9215|15.0262
Kunratice|Děčín|40502|50.8189|14.42
Kunratice u Cvikova|Česká Lípa|47155|50.7688|14.6787
Kunvald|Ústí nad Orlicí|56181|50.1294|16.5001
Kunín|Nový Jičín|74253|49.6339|17.9898
Kunčice|Hradec Králové|50315|50.2176|15.636
Kunčice nad Labem|Trutnov|54361|50.582|15.6195
Kunčice pod Ondřejníkem|Frýdek-Místek|73913|49.5508|18.2612
Kunčina|Svitavy|56924|49.7947|16.6277
Kunčina Ves|Blansko|67971|49.4471|16.4754
Kunějovice|Plzeň-sever|33035|49.8621|13.237
Kunětice|Pardubice|53304|50.0707|15.827
Kunštát|Blansko|67972|49.5066|16.5173
Kunžak|Jindřichův Hradec|37862|49.1213|15.1904
Kupařovice|Brno-venkov|66464|49.0433|16.4908
Kurdějov|Břeclav|69301|48.9579|16.7636
Kuroslepy|Třebíč|67575|49.1544|16.2102
Kurovice|Kroměříž|76852|49.2892|17.5157
Kutná Hora|Kutná Hora|28401|49.9525|15.2688
Kutrovice|Kladno|27375|50.2617|14.019
Kučerov|Vyškov|68201|49.2187|17.0054
Kučeř|Písek|39834|49.4343|14.2457
Kuňovice|Benešov|25765|49.6584|14.9995
Kuřim|Brno-venkov|66434|49.2986|16.5315
Kuřimany|Strakonice|38601|49.204|13.9682
Kuřimská Nová Ves|Brno-venkov|59455|49.3457|16.2972
Kuřimské Jestřabí|Brno-venkov|59455|49.3467|16.314
Kuželov|Hodonín|69673|48.8597|17.4889
Kvasice|Kroměříž|76821|49.2423|17.4699
Kvasiny|Rychnov nad Kněžnou|51702|50.2126|16.2633
Kvilda|Prachatice|38493|49.0194|13.5797
Kváskovice|Strakonice|38601|49.1885|14.0038
Kvášňovice|Klatovy|34101|49.4131|13.6421
Kvílice|Kladno|27375|50.2582|14.0024
Kvítkov|Česká Lípa|47001|50.655|14.4868
Kvítkovice|České Budějovice|37384|48.9575|14.3313
Kvíčovice|Domažlice|34562|49.5903|13.0731
Květinov|Havlíčkův Brod|58001|49.5648|15.5074
Květnice|Praha-východ|25084|50.0574|14.6842
Květná|Svitavy|57201|49.7363|16.3463
Květov|Písek|39901|49.4255|14.2759
Kyje|Jičín|50713|50.4944|15.3781
Kyjov|Hodonín|69701|49.01|17.1226
Kyjov|Havlíčkův Brod|58001|49.6296|15.6233
Kyjov|Žďár nad Sázavou|59214|49.4435|15.8817
Kyjovice|Znojmo|67161|48.9138|16.1666
Kyjovice|Opava|74768|49.8324|18.0422
Kynice|Havlíčkův Brod|58401|49.7393|15.3602
Kynšperk nad Ohří|Sokolov|35751|50.119|12.5304
Kyselka|Karlovy Vary|36272|50.2628|13.0
Kyselovice|Kroměříž|76811|49.3773|17.4022
Kytlice|Děčín|40745|50.8127|14.5355
Kytín|Praha-západ|25210|49.8507|14.2192
Kyšice|Plzeň-město|33001|49.7534|13.4863
Kyšice|Kladno|27351|50.0913|14.1063
Kyškovice|Litoměřice|41301|50.4483|14.286
Kácov|Kutná Hora|28509|49.778|15.028
Kájov|Český Krumlov|38221|48.8109|14.2587
Kámen|Havlíčkův Brod|58242|49.712|15.52
Kámen|Pelhřimov|39413|49.4234|15.016
Kámen|Děčín|40713|50.8103|14.2685
Káranice|Hradec Králové|50366|50.1531|15.5576
Káraný|Praha-východ|25075|50.1749|14.7371
Kňovice|Příbram|26401|49.6884|14.4004
Křekov|Zlín|76601|49.1296|17.9679
Křelov-Břuchotín|Olomouc|78336|49.6145|17.1957
Křelovice|Pelhřimov|39445|49.537|15.1687
Křelovice|Plzeň-sever|33036|49.8744|13.0759
Křemže|Český Krumlov|38203|48.9051|14.3058
Křenek|Praha-východ|27714|50.2296|14.6296
Křenice|Klatovy|34012|49.5028|13.2004
Křenice|Praha-východ|25084|50.0311|14.6686
Křenov|Svitavy|56922|49.6798|16.6289
Křenovice|Písek|39843|49.3674|14.343
Křenovice|Vyškov|68352|49.1423|16.8294
Křenovice|Přerov|75201|49.3305|17.2727
Křenovy|Domažlice|34561|49.5393|13.0216
Křepenice|Příbram|26401|49.703|14.3477
Křepice|Břeclav|69165|49.0|16.72
Křepice|Znojmo|67140|48.9875|16.0975
Křesetice|Kutná Hora|28547|49.9072|15.263
Křesín|Litoměřice|41002|50.3946|13.9808
Křetín|Blansko|67962|49.5632|16.5045
Křeč|Pelhřimov|39495|49.3894|14.9171
Křečhoř|Kolín|28002|50.0256|15.1271
Křečkov|Nymburk|29001|50.1801|15.1144
Křečovice|Benešov|25756|49.7214|14.4756
Křešice|Litoměřice|41148|50.5227|14.2146
Křešín|Pelhřimov|39424|49.5818|15.0438
Křešín|Příbram|26223|49.7996|13.9482
Křimov|Chomutov|43001|50.4861|13.3016
Křinec|Nymburk|28933|50.2646|15.1379
Křinice|Náchod|55001|50.5718|16.3061
Křivoklát|Rakovník|27023|50.038|13.8705
Křivsoudov|Benešov|25766|49.6331|15.0875
Křičeň|Pardubice|53341|50.1096|15.6517
Křišťanov|Prachatice|38301|48.9092|14.0201
Křišťanovice|Bruntál|79368|49.8509|17.5111
Křižanov|Písek|39843|49.3988|14.3782
Křižanov|Žďár nad Sázavou|59451|49.3887|16.1097
Křižanovice|Vyškov|68501|49.1424|16.9392
Křižanovice|Chrudim|53821|49.8595|15.7618
Křižanovice u Vyškova|Vyškov|68201|49.2878|17.0403
Křižany|Liberec|46353|50.7386|14.9014
Křižovatka|Cheb|35134|50.1943|12.3932
Křižánky|Žďár nad Sázavou|59202|49.6877|16.0644
Křižínkov|Brno-venkov|59453|49.3259|16.2704
Křoví|Žďár nad Sázavou|59454|49.3061|16.2644
Křtiny|Blansko|67905|49.2972|16.7442
Křtomil|Přerov|75114|49.4092|17.6263
Křtěnov|Blansko|67974|49.5451|16.4194
Křídla|Žďár nad Sázavou|59231|49.5273|16.1225
Křídlůvky|Znojmo|67128|48.7818|16.2391
Křížkový Újezdec|Praha-východ|25168|49.9309|14.5855
Kšely|Kolín|28201|50.0435|14.902
Kšice|Tachov|34901|49.8025|12.9974
Labská Stráň|Děčín|40502|50.8488|14.2317
Labské Chrčice|Pardubice|28126|50.0515|15.4103
Labuty|Hodonín|69648|49.0467|17.2146
Ladná|Břeclav|69146|48.8055|16.8724
Lahošť|Teplice|41725|50.6183|13.7654
Lampertice|Trutnov|54101|50.6647|15.9511
Lančov|Znojmo|67106|48.9072|15.7679
Lanškroun|Ústí nad Orlicí|56301|49.9121|16.6126
Lanžhot|Břeclav|69151|48.7245|16.9671
Lanžov|Trutnov|54401|50.3869|15.7609
Lavičky|Žďár nad Sázavou|59401|49.3806|15.9684
Lavičné|Svitavy|56904|49.6437|16.4626
Lazinov|Blansko|67962|49.5639|16.5235
Lazníky|Přerov|75125|49.5245|17.4628
Lazníčky|Přerov|75125|49.5456|17.4602
Lazsko|Příbram|26231|49.6236|14.004
Lačnov|Vsetín|75612|49.1789|18.0166
Laškov|Prostějov|79857|49.5841|17.0022
Lašovice|Rakovník|27021|50.0551|13.7823
Lažany|Strakonice|38801|49.3629|13.8832
Lažany|Blansko|67922|49.3545|16.5501
Lažany|Liberec|46345|50.601|15.1099
Lažiště|Prachatice|38432|49.0377|13.9278
Lažánky|Strakonice|38801|49.3915|13.8368
Lažánky|Brno-venkov|66471|49.279|16.3882
Lechotice|Kroměříž|76852|49.2738|17.588
Lechovice|Znojmo|67163|48.873|16.2219
Ledce|Brno-venkov|66462|49.0516|16.5571
Ledce|Hradec Králové|51771|50.2239|16.0428
Ledce|Plzeň-sever|33014|49.8217|13.3285
Ledce|Kladno|27305|50.1965|14.0051
Ledce|Mladá Boleslav|29447|50.3535|15.0846
Ledenice|České Budějovice|37311|48.9323|14.6181
Ledeč nad Sázavou|Havlíčkův Brod|58401|49.6953|15.2778
Ledečko|Kutná Hora|28506|49.8499|14.949
Lednice|Břeclav|69144|48.8|16.8035
Ledvice|Teplice|41772|50.5851|13.7721
Ledčice|Mělník|27708|50.3411|14.2946
Lejšovka|Hradec Králové|50303|50.2978|15.9424
Lelekovice|Brno-venkov|66431|49.2915|16.5788
Lenešice|Louny|43923|50.3753|13.766
Lenora|Prachatice|38442|48.9224|13.7934
Leskovec|Vsetín|75611|49.2844|17.9988
Leskovec nad Moravicí|Bruntál|79368|49.906|17.5747
Leskovice|Pelhřimov|39414|49.43|15.0812
Lesnice|Šumperk|78901|49.8839|16.9413
Lesná|Znojmo|67102|48.9073|15.8688
Lesná|Pelhřimov|39501|49.518|15.0577
Lesná|Třebíč|67526|49.1714|15.6795
Lesná|Tachov|34701|49.7543|12.5378
Lesní Hluboké|Brno-venkov|66483|49.2688|16.3069
Lesní Jakubov|Třebíč|67573|49.2059|16.2435
Lesonice|Znojmo|67201|49.0034|16.3107
Lesonice|Třebíč|67544|49.108|15.756
Lestkov|Tachov|34953|49.8832|12.8711
Lesůňky|Třebíč|67551|49.1072|15.8424
Letiny|Plzeň-jih|33601|49.54|13.4554
Letkov|Plzeň-město|32600|49.7305|13.4651
Letohrad|Ústí nad Orlicí|56151|50.0361|16.5002
Letonice|Vyškov|68335|49.1774|16.9592
Letovice|Blansko|67961|49.5472|16.5737
Lety|Písek|39804|49.517|14.0879
Lety|Praha-západ|25229|49.9211|14.2553
Levín|Litoměřice|41145|50.6139|14.284
Levínská Olešnice|Semily|51401|50.5283|15.5408
Lešany|Prostějov|79842|49.4998|17.0242
Lešany|Benešov|25744|49.8443|14.5251
Lešetice|Příbram|26231|49.6473|14.0212
Leškovice|Havlíčkův Brod|58282|49.763|15.5371
Lešná|Vsetín|75641|49.5207|17.9302
Leština|Šumperk|78971|49.8689|16.9276
Leština|Ústí nad Orlicí|53944|49.8678|16.1179
Leština u Světlé|Havlíčkův Brod|58286|49.7615|15.3977
Leštinka|Chrudim|53973|49.8453|15.959
Lhenice|Prachatice|38402|48.9949|14.1499
Lhota|Přerov|75131|49.4977|17.6149
Lhota|Kladno|27301|50.0887|14.0119
Lhota|Praha-východ|27714|50.2433|14.6565
Lhota|Zlín|76302|49.1694|17.6025
Lhota Rapotina|Blansko|67901|49.4661|16.625
Lhota pod Hořičkami|Náchod|55205|50.4228|16.0032
Lhota pod Libčany|Hradec Králové|50327|50.1725|15.6963
Lhota pod Radčem|Rokycany|33701|49.8275|13.7108
Lhota u Lysic|Blansko|67971|49.4698|16.4969
Lhota u Olešnice|Blansko|67974|49.5449|16.3908
Lhota u Příbramě|Příbram|26101|49.7143|13.9806
Lhota u Vsetína|Vsetín|75501|49.3047|17.9581
Lhota-Vlasenice|Pelhřimov|39470|49.3028|15.1248
Lhotice|Třebíč|67531|49.0194|15.6072
Lhotka|Jihlava|58856|49.2092|15.3858
Lhotka|Žďár nad Sázavou|59101|49.5823|16.003
Lhotka|Frýdek-Místek|73947|49.5973|18.2985
Lhotka|Přerov|75124|49.4998|17.4102
Lhotka|Beroun|26723|49.8323|13.9963
Lhotka|Mělník|27731|50.3715|14.5489
Lhotka nad Labem|Litoměřice|41002|50.5257|14.0474
Lhotka u Litultovic|Opava|74755|49.8729|17.7309
Lhotka u Radnic|Rokycany|33824|49.89|13.5817
Lhotky|Mladá Boleslav|29406|50.3964|15.053
Lhotsko|Zlín|76312|49.2123|17.8835
Lhoty u Potštejna|Rychnov nad Kněžnou|51741|50.056|16.2688
Lhánice|Třebíč|67575|49.1092|16.2235
Lhůta|Plzeň-město|33201|49.7014|13.5289
Libavské Údolí|Sokolov|35751|50.129|12.5526
Libavá (vojenský újezd)|Olomouc|78501|49.7231|17.5235
Libchavy|Ústí nad Orlicí|56116|50.0056|16.3891
Libchyně|Náchod|54901|50.3567|16.19
Libecina|Ústí nad Orlicí|56601|49.883|16.1183
Libel|Rychnov nad Kněžnou|51741|50.1552|16.2024
Libenice|Kolín|28002|49.9846|15.258
Liberec|Liberec|46001|50.7664|15.0544
Liberk|Rychnov nad Kněžnou|51712|50.1993|16.343
Libeř|Praha-západ|25241|49.9243|14.4807
Libež|Benešov|25726|49.7575|14.9169
Libhošť|Nový Jičín|74257|49.6266|18.0771
Libice nad Cidlinou|Nymburk|28907|50.1269|15.1783
Libice nad Doubravou|Havlíčkův Brod|58277|49.745|15.7043
Libina|Šumperk|78805|49.8765|17.0828
Libiš|Mělník|27711|50.2743|14.5025
Libišany|Pardubice|53345|50.1534|15.7567
Libkov|Chrudim|53825|49.8418|15.7564
Libkov|Domažlice|34506|49.3663|13.1345
Libkova Voda|Pelhřimov|39462|49.3766|15.1911
Libkovice pod Řípem|Litoměřice|41301|50.3925|14.3424
Liblice|Mělník|27732|50.3134|14.5905
Liblín|Rokycany|33141|49.9169|13.5444
Libníkovice|Hradec Králové|50346|50.2443|15.9962
Libníč|České Budějovice|37371|49.0198|14.5437
Libochovany|Litoměřice|41103|50.5667|14.0391
Libochovice|Litoměřice|41117|50.4064|14.0445
Libochovičky|Kladno|27342|50.1727|14.2397
Libodřice|Kolín|28002|50.0044|15.0884
Libomyšl|Beroun|26723|49.8726|13.9987
Liboměřice|Chrudim|53821|49.8719|15.7414
Libotenice|Litoměřice|41201|50.477|14.2294
Libotov|Trutnov|54401|50.3995|15.812
Libouchec|Ústí nad Labem|40335|50.7587|14.0408
Libovice|Kladno|27379|50.2357|14.0165
Libočany|Louny|43975|50.3335|13.5136
Libořice|Louny|43801|50.2548|13.5152
Liboš|Olomouc|78313|49.6917|17.2251
Libošovice|Jičín|50744|50.4907|15.1629
Librantice|Hradec Králové|50346|50.2424|15.9598
Libuň|Jičín|50715|50.4983|15.2986
Libušín|Kladno|27306|50.1683|14.0547
Libá|Cheb|35131|50.1283|12.2309
Libáň|Jičín|50723|50.3755|15.217
Libín|České Budějovice|37373|48.9697|14.6837
Libčany|Hradec Králové|50322|50.1919|15.695
Libčeves|Louny|43926|50.4526|13.8383
Libčice nad Vltavou|Praha-západ|25266|50.1991|14.3628
Liběchov|Mělník|27721|50.4079|14.4469
Libědice|Chomutov|43801|50.316|13.3857
Libějice|Tábor|39002|49.3769|14.624
Libějovice|Strakonice|38772|49.1144|14.1935
Libětice|Strakonice|38601|49.2191|13.8628
Liběšice|Litoměřice|41146|50.569|14.2892
Liběšice|Louny|43963|50.2937|13.6216
Libňatov|Trutnov|54236|50.4814|16.0023
Libřice|Hradec Králové|50344|50.2879|15.964
Libštát|Semily|51203|50.5595|15.416
Lichkov|Ústí nad Orlicí|56168|50.0979|16.6661
Lichnov|Bruntál|79315|50.008|17.6265
Lichnov|Nový Jičín|74275|49.5637|18.1701
Lichoceves|Praha-západ|25264|50.1529|14.2844
Licibořice|Chrudim|53823|49.877|15.76
Lidečko|Vsetín|75612|49.2031|18.0514
Lidice|Kladno|27354|50.1436|14.1902
Lidmaň|Pelhřimov|39501|49.3819|15.0368
Linhartice|Svitavy|57101|49.7574|16.6953
Lipec|Kolín|28126|50.0851|15.3647
Lipina|Olomouc|78501|49.7418|17.3236
Lipinka|Olomouc|78383|49.8379|17.0501
Lipnice nad Sázavou|Havlíčkův Brod|58232|49.6131|15.4137
Lipno|Louny|43801|50.3007|13.681
Lipno nad Vltavou|Český Krumlov|38278|48.6394|14.2294
Lipník|Třebíč|67552|49.1444|15.9507
Lipník|Mladá Boleslav|29443|50.2726|14.9125
Lipník nad Bečvou|Přerov|75131|49.5268|17.5867
Lipoltice|Pardubice|53364|49.9879|15.569
Lipov|Hodonín|69672|48.905|17.4618
Lipovec|Blansko|67915|49.384|16.8059
Lipovec|Chrudim|53843|49.9164|15.5451
Lipovice|Prachatice|38422|49.1006|13.994
Lipová|Cheb|35002|50.0364|12.4489
Lipová|Prostějov|79845|49.5261|16.8619
Lipová|Přerov|75114|49.4099|17.6142
Lipová|Děčín|40781|51.0111|14.3603
Lipová|Zlín|76321|49.122|17.8797
Lipová-lázně|Jeseník|79061|50.2279|17.1406
Liptaň|Bruntál|79399|50.2224|17.6055
Liptál|Vsetín|75501|49.2906|17.9219
Lipí|České Budějovice|37384|48.9496|14.3522
Lipůvka|Blansko|67922|49.3404|16.553
Lisov|Plzeň-jih|33301|49.6386|13.101
Litenčice|Kroměříž|76813|49.2023|17.2085
Liteň|Beroun|26727|49.9038|14.1491
Litichovice|Benešov|25726|49.783|14.8507
Litoboř|Náchod|55205|50.45|16.0154
Litobratřice|Znojmo|67178|48.8871|16.4026
Litochovice|Strakonice|38701|49.1594|13.9415
Litohlavy|Rokycany|33701|49.7665|13.5647
Litohoř|Třebíč|67544|49.0669|15.7685
Litohošť|Pelhřimov|39501|49.4497|15.0911
Litomyšl|Svitavy|57001|49.8706|16.3112
Litoměřice|Litoměřice|41201|50.5385|14.1306
Litostrov|Brno-venkov|66483|49.2252|16.3308
Litovany|Třebíč|67557|49.0551|16.044
Litovel|Olomouc|78401|49.7013|17.0763
Litošice|Pardubice|53501|49.9849|15.5143
Litultovice|Opava|74755|49.904|17.7515
Litvínov|Most|43601|50.5985|13.6103
Litvínovice|České Budějovice|37001|48.9622|14.4516
Litíč|Trutnov|54401|50.3753|15.8485
Lično|Rychnov nad Kněžnou|51735|50.178|16.1721
Lišany|Rakovník|27052|50.1475|13.742
Lišany|Louny|44001|50.3445|13.642
Lišice|Hradec Králové|50351|50.1811|15.4082
Lišnice|Most|43401|50.4546|13.6331
Lišov|České Budějovice|37372|49.0161|14.6085
Lkáň|Litoměřice|41115|50.4431|13.9698
Lnáře|Strakonice|38742|49.458|13.7842
Lobendava|Děčín|40784|51.0196|14.3143
Lobeč|Mělník|27736|50.4606|14.6669
Lobodice|Přerov|75101|49.3956|17.292
Lochenice|Hradec Králové|50302|50.2722|15.82
Lochousice|Plzeň-sever|33023|49.6752|13.0906
Lochovice|Beroun|26723|49.8533|13.9814
Lodhéřov|Jindřichův Hradec|37826|49.2152|14.96
Lodín|Hradec Králové|50315|50.271|15.6106
Loděnice|Brno-venkov|67175|49.0117|16.4632
Loděnice|Beroun|26712|49.995|14.158
Loket|Sokolov|35733|50.1861|12.7542
Loket|Benešov|25765|49.6556|15.117
Lom|Strakonice|38801|49.4106|13.9891
Lom|Tábor|39002|49.363|14.6284
Lom|Most|43511|50.5934|13.6574
Lom u Tachova|Tachov|34701|49.8188|12.6927
Lomec|Klatovy|33901|49.3715|13.2676
Lomnice|Brno-venkov|67923|49.4047|16.4137
Lomnice|Sokolov|35601|50.2119|12.6328
Lomnice|Bruntál|79302|49.8711|17.4152
Lomnice nad Lužnicí|Jindřichův Hradec|37816|49.0848|14.7174
Lomnice nad Popelkou|Semily|51251|50.5307|15.3735
Lomnička|Brno-venkov|66601|49.3671|16.4314
Lomy|Třebíč|67531|49.0656|15.6012
Lopeník|Uherské Hradiště|68767|48.9429|17.7812
Losiná|Plzeň-město|33204|49.6693|13.4484
Loucká|Kladno|27324|50.3276|14.2391
Louka|Blansko|67974|49.5293|16.4311
Louka|Hodonín|69676|48.9153|17.4894
Louka u Litvínova|Most|43533|50.588|13.6366
Loukov|Mladá Boleslav|29411|50.5614|15.0357
Loukov|Kroměříž|76875|49.4219|17.7211
Loukovec|Mladá Boleslav|29411|50.562|15.0158
Loukovice|Třebíč|67522|49.1373|15.7935
Louny|Louny|44001|50.3541|13.8035
Loučany|Olomouc|78344|49.602|17.0828
Loučeň|Nymburk|28937|50.2858|15.0202
Loučim|Domažlice|34506|49.3672|13.1122
Loučka|Olomouc|78322|49.6569|17.0112
Loučka|Vsetín|75644|49.4388|17.8328
Loučka|Zlín|76325|49.1701|17.8762
Loučky|Semily|51101|50.6177|15.2186
Loučná nad Desnou|Šumperk|78811|50.0717|17.0911
Loučná pod Klínovcem|Chomutov|43191|50.4207|12.9867
Loučovice|Český Krumlov|38276|48.6203|14.2576
Louňovice|Praha-východ|25162|49.9824|14.7618
Louňovice pod Blaníkem|Benešov|25706|49.6373|14.8468
Louňová|Plzeň-jih|33601|49.5623|13.608
Loužnice|Jablonec nad Nisou|46822|50.6797|15.2678
Lovečkovice|Litoměřice|41145|50.6217|14.2633
Lovosice|Litoměřice|41002|50.5151|14.0511
Lovčice|Hodonín|69639|49.0637|17.0544
Lovčice|Hradec Králové|50361|50.1653|15.3847
Lovčičky|Vyškov|68354|49.068|16.8503
Lovčovice|Třebíč|67531|48.9816|15.5344
Loza|Plzeň-sever|33152|49.8939|13.2905
Lozice|Chrudim|53854|49.9166|16.0239
Ločenice|České Budějovice|37322|48.8243|14.5276
Lošany|Kolín|28002|49.9976|15.126
Loštice|Šumperk|78983|49.7448|16.929
Lubenec|Louny|43983|50.1322|13.3133
Lubnice|Znojmo|67107|48.9396|15.614
Lubná|Svitavy|56963|49.7742|16.2238
Lubná|Rakovník|27036|50.077|13.7008
Lubná|Kroměříž|76701|49.2208|17.3981
Lubné|Brno-venkov|59451|49.3543|16.2753
Lubník|Ústí nad Orlicí|56301|49.8886|16.6616
Luboměř|Nový Jičín|74235|49.6888|17.7066
Luboměř pod Strážnou|Přerov|75362|49.6891|17.6638
Luby|Cheb|35137|50.2526|12.4061
Lubě|Blansko|67921|49.3963|16.5261
Luběnice|Olomouc|78346|49.5763|17.1206
Ludgeřovice|Opava|74714|49.8905|18.2402
Ludkovice|Zlín|76341|49.1148|17.7267
Ludmírov|Prostějov|79855|49.6414|16.8733
Ludslavice|Kroměříž|76852|49.2996|17.5408
Ludvíkov|Bruntál|79326|50.1075|17.3424
Ludvíkovice|Děčín|40713|50.7942|14.2565
Ludíkov|Blansko|68001|49.4555|16.7319
Luhačovice|Zlín|76326|49.0999|17.7576
Luka|Česká Lípa|47201|50.5125|14.6642
Luka nad Jihlavou|Jihlava|58822|49.3741|15.702
Lukavec|Pelhřimov|39426|49.5655|14.9905
Lukavec|Litoměřice|41002|50.5017|14.0858
Lukavec u Hořic|Jičín|50801|50.3958|15.617
Lukavice|Rychnov nad Kněžnou|51603|50.2003|16.2937
Lukavice|Šumperk|78901|49.823|16.9205
Lukavice|Chrudim|53821|49.8889|15.839
Lukavice|Ústí nad Orlicí|56151|50.0604|16.4822
Lukov|Znojmo|66902|48.8617|15.9108
Lukov|Třebíč|67602|49.0736|15.8243
Lukov|Teplice|41804|50.5282|13.8855
Lukov|Zlín|76317|49.2904|17.7297
Lukovany|Brno-venkov|66484|49.1626|16.298
Lukoveček|Zlín|76316|49.3036|17.6688
Luková|Ústí nad Orlicí|56123|49.8756|16.6068
Luká|Olomouc|78324|49.6492|16.9474
Luleč|Vyškov|68303|49.2536|16.9288
Lupenice|Rychnov nad Kněžnou|51741|50.133|16.2739
Lutonina|Zlín|76312|49.2386|17.8829
Lutopecny|Kroměříž|76701|49.3015|17.3445
Lutín|Olomouc|78349|49.5586|17.1358
Lučany nad Nisou|Jablonec nad Nisou|46871|50.7415|15.2206
Lučice|Havlíčkův Brod|58235|49.6624|15.4968
Lučina|Frýdek-Místek|73939|49.716|18.4498
Luštěnice|Mladá Boleslav|29442|50.3231|14.9368
Lužany|Hradec Králové|50305|50.3396|15.8195
Lužany|Jičín|50706|50.4312|15.4704
Lužany|Plzeň-jih|33454|49.5468|13.3158
Lužce|Beroun|26718|49.9842|14.1968
Luže|Chrudim|53854|49.8935|16.0286
Lužec nad Cidlinou|Hradec Králové|50362|50.2136|15.412
Lužec nad Vltavou|Mělník|27706|50.3215|14.4003
Luženičky|Domažlice|34401|49.4589|12.8977
Lužice|Prachatice|38411|49.0314|14.205
Lužice|Hodonín|69618|48.8411|17.0711
Lužice|Olomouc|78501|49.7158|17.2597
Lužice|Most|43524|50.4918|13.7543
Lužnice|Jindřichův Hradec|37901|49.0631|14.7563
Lužná|Rakovník|27051|50.1239|13.7702
Lužná|Vsetín|75611|49.2399|18.0198
Lysice|Blansko|67971|49.4517|16.5373
Lysovice|Vyškov|68201|49.218|16.9706
Lysá nad Labem|Nymburk|28922|50.2015|14.8329
Lánov|Trutnov|54341|50.6202|15.6558
Lány|Havlíčkův Brod|58301|49.7595|15.713
Lány|Chrudim|53701|49.9465|15.7272
Lány|Kladno|27061|50.1248|13.9505
Lány u Dašic|Pardubice|53002|50.0436|15.8892
Lásenice|Jindřichův Hradec|37801|49.0744|14.9703
Láz|Třebíč|67541|49.0124|15.7852
Láz|Příbram|26241|49.6521|13.9167
Lázně Bohdaneč|Pardubice|53341|50.0757|15.6799
Lázně Bělohrad|Jičín|50781|50.4288|15.5828
Lázně Kynžvart|Cheb|35491|50.0107|12.6249
Lázně Libverda|Liberec|46362|50.8902|15.1905
Lázně Toušeň|Praha-východ|25089|50.1694|14.7161
Lážovice|Beroun|26724|49.8583|14.0714
Líbeznice|Praha-východ|25065|50.1921|14.4937
Líně|Plzeň-sever|33021|49.6948|13.257
Lípa|Havlíčkův Brod|58257|49.5546|15.5429
Lípa|Zlín|76311|49.2154|17.7688
Lípa nad Orlicí|Rychnov nad Kněžnou|51721|50.1357|16.0981
Lísek|Žďár nad Sázavou|59301|49.5869|16.2012
Lískovice|Jičín|50801|50.337|15.555
Líský|Kladno|27376|50.2507|13.929
Líté|Plzeň-sever|33152|49.9138|13.2608
Líšina|Plzeň-jih|33301|49.6036|13.1648
Líšnice|Šumperk|78985|49.7559|16.8761
Líšnice|Ústí nad Orlicí|56184|50.0799|16.5083
Líšnice|Praha-západ|25210|49.8889|14.3191
Líšná|Žďár nad Sázavou|59203|49.6403|16.1512
Líšná|Přerov|75115|49.4117|17.5475
Líšná|Rokycany|33808|49.8851|13.8065
Líšný|Jablonec nad Nisou|46822|50.6457|15.2123
Líšťany|Plzeň-sever|33035|49.8312|13.1812
Líšťany|Louny|44001|50.3126|13.8
Lčovice|Prachatice|38481|49.1146|13.8507
Lštění|Benešov|25722|49.8644|14.7144
Machov|Náchod|54963|50.4994|16.277
Machová|Zlín|76301|49.2544|17.5451
Mackovice|Znojmo|67178|48.8837|16.3094
Mahouš|Prachatice|38411|49.0479|14.2561
Majdalena|Jindřichův Hradec|37803|48.9608|14.8614
Majetín|Olomouc|75103|49.4982|17.3332
Makotřasy|Kladno|27354|50.1446|14.2148
Makov|Blansko|67972|49.5192|16.4838
Makov|Svitavy|57001|49.8551|16.1912
Malenice|Strakonice|38706|49.1265|13.8829
Malenovice|Frýdek-Místek|73911|49.5793|18.3981
Maletín|Šumperk|78901|49.7994|16.7874
Maleč|Havlíčkův Brod|58276|49.7721|15.6769
Malečov|Ústí nad Labem|40327|50.632|14.1196
Malešov|Kutná Hora|28541|49.9111|15.2244
Malešovice|Brno-venkov|66465|49.0237|16.5014
Malhostovice|Brno-venkov|66603|49.3337|16.5023
Malhotice|Přerov|75353|49.4901|17.7643
Malinová|Rakovník|27035|50.0479|13.667
Malonty|Český Krumlov|38291|48.6862|14.5769
Malotice|Kolín|28163|49.9653|14.9777
Malovice|Prachatice|38411|49.0913|14.2259
Malá Bystřice|Vsetín|75627|49.4095|18.0486
Malá Hraštice|Příbram|26203|49.8076|14.28
Malá Lhota|Blansko|67921|49.392|16.5496
Malá Losenice|Žďár nad Sázavou|59211|49.6|15.7967
Malá Morava|Šumperk|78833|50.0964|16.8268
Malá Morávka|Bruntál|79336|50.0212|17.3117
Malá Roudka|Blansko|67963|49.6018|16.6446
Malá Skála|Jablonec nad Nisou|46822|50.6464|15.1955
Malá Veleň|Děčín|40502|50.7416|14.2707
Malá Vrbka|Hodonín|69673|48.8695|17.4593
Malá Víska|Beroun|26762|49.7761|13.8756
Malá Úpa|Trutnov|54227|50.7449|15.8206
Malá Štáhle|Bruntál|79501|49.9515|17.3416
Malé Březno|Most|43401|50.4626|13.5603
Malé Březno|Ústí nad Labem|40002|50.6727|14.1724
Malé Hradisko|Prostějov|79849|49.4934|16.8767
Malé Kyšice|Kladno|27351|50.0612|14.0904
Malé Přítočno|Kladno|27351|50.1078|14.1357
Malé Svatoňovice|Trutnov|54234|50.534|16.0499
Malé Výkleky|Pardubice|53316|50.1194|15.5386
Malé Žernoseky|Litoměřice|41002|50.5341|14.0548
Malíkov|Svitavy|57101|49.7311|16.6962
Malíkovice|Kladno|27377|50.2115|13.9827
Malínky|Vyškov|68333|49.1594|17.1603
Malíč|Litoměřice|41201|50.5436|14.0821
Malý Beranov|Jihlava|58603|49.3966|15.6378
Malý Bor|Klatovy|34101|49.3306|13.6524
Malý Újezd|Mělník|27731|50.3326|14.5297
Malčín|Havlíčkův Brod|58291|49.6887|15.4653
Malšice|Tábor|39175|49.364|14.5788
Malšovice|Děčín|40502|50.7353|14.1698
Malšín|Český Krumlov|38273|48.6781|14.2871
Mankovice|Nový Jičín|74235|49.6376|17.8802
Manětín|Plzeň-sever|33162|49.9919|13.2333
Mariánské Lázně|Cheb|35301|49.9647|12.7013
Mariánské Radčice|Most|43532|50.5741|13.6651
Markvartice|Jihlava|58856|49.1783|15.6172
Markvartice|Třebíč|67522|49.201|15.7674
Markvartice|Jičín|50742|50.4309|15.1962
Markvartice|Děčín|40742|50.7756|14.3554
Markvartovice|Opava|74714|49.906|18.2361
Martinice|Žďár nad Sázavou|59401|49.3718|16.0383
Martinice|Kroměříž|76901|49.3104|17.6012
Martinice u Onšova|Pelhřimov|39501|49.58|15.1155
Martinice v Krkonoších|Semily|51232|50.5809|15.5334
Martiněves|Litoměřice|41119|50.3728|14.1529
Martínkov|Třebíč|67544|49.0968|15.7115
Martínkovice|Náchod|54973|50.5476|16.3421
Maršov|Brno-venkov|66471|49.2838|16.3599
Maršov u Úpice|Trutnov|54232|50.4847|15.976
Maršovice|Jablonec nad Nisou|46801|50.6965|15.1986
Maršovice|Benešov|25755|49.7137|14.5646
Masojedy|Kolín|28201|50.0261|14.778
Mastník|Třebíč|67522|49.1803|15.8279
Matějov|Žďár nad Sázavou|59212|49.5287|15.8631
Mazelov|České Budějovice|37363|49.1031|14.6179
Mačkov|Strakonice|38801|49.4044|13.8862
Maňovice|Klatovy|34101|49.3931|13.6539
Mařenice|Česká Lípa|47156|50.8075|14.6787
Mašovice|Znojmo|66902|48.8575|15.9736
Mašťov|Chomutov|43156|50.2624|13.2806
Mažice|Tábor|39181|49.2136|14.6129
Mcely|Nymburk|28936|50.2944|15.076
Meclov|Domažlice|34521|49.5057|12.8809
Medlice|Znojmo|67140|49.0031|16.1214
Medlov|Brno-venkov|66466|49.0352|16.5225
Medlov|Olomouc|78391|49.7876|17.0627
Medlovice|Vyškov|68201|49.2745|17.093
Medlovice|Uherské Hradiště|68741|49.0491|17.2719
Medonosy|Mělník|27721|50.4943|14.487
Medový Újezd|Rokycany|33701|49.7739|13.7192
Melč|Opava|74784|49.85|17.7579
Menhartice|Třebíč|67531|48.9901|15.5526
Merboltice|Děčín|40502|50.6843|14.3392
Merklín|Karlovy Vary|36234|50.3282|12.8636
Merklín|Plzeň-jih|33452|49.5605|13.198
Metylovice|Frýdek-Místek|73949|49.6068|18.3392
Mezholezy|Domažlice|34506|49.4118|13.104
Mezholezy|Domažlice|34601|49.6249|12.9051
Meziboří|Most|43513|50.6213|13.5988
Mezihoří|Klatovy|34012|49.4885|13.2547
Mezilesí|Pelhřimov|39501|49.541|14.9492
Mezilesí|Náchod|54923|50.3562|16.2171
Mezilečí|Náchod|55205|50.4535|15.9833
Meziměstí|Náchod|54981|50.6247|16.2422
Mezina|Bruntál|79201|49.9586|17.4772
Meziříčko|Třebíč|67526|49.1094|15.6603
Meziříčko|Žďár nad Sázavou|58827|49.4055|15.8446
Meziříčí|Tábor|39131|49.4366|14.5751
Mezno|Benešov|25786|49.5346|14.645
Mezná|Tábor|39201|49.2582|14.8008
Mezná|Pelhřimov|39301|49.3471|15.2115
Mezouň|Beroun|26718|50.0044|14.2143
Mečeříž|Mladá Boleslav|29477|50.2905|14.7369
Mečichov|Strakonice|38736|49.3479|13.8121
Mešno|Rokycany|33843|49.6559|13.6221
Michalovice|Havlíčkův Brod|58001|49.577|15.5244
Michalovice|Litoměřice|41201|50.5367|14.082
Mikolajice|Opava|74784|49.8773|17.7934
Mikuleč|Svitavy|56802|49.8059|16.4226
Mikulov|Břeclav|69201|48.8054|16.6378
Mikulov|Teplice|41901|50.6877|13.7217
Mikulovice|Znojmo|67133|48.9569|16.0948
Mikulovice|Třebíč|67522|49.1618|15.8467
Mikulovice|Jeseník|79084|50.2986|17.3217
Mikulovice|Pardubice|53002|49.9895|15.7755
Mikulášovice|Děčín|40779|50.9652|14.3638
Mikulčice|Hodonín|69619|48.8165|17.0512
Mikulůvka|Vsetín|75624|49.4136|17.9252
Milasín|Žďár nad Sázavou|59251|49.4663|16.2289
Milavče|Domažlice|34401|49.4671|12.9808
Milejovice|Strakonice|38701|49.1882|13.9302
Milenov|Přerov|75361|49.5627|17.6671
Miletín|Jičín|50771|50.4039|15.6824
Milevsko|Písek|39901|49.451|14.3601
Mileč|Plzeň-jih|33501|49.4692|13.605
Milešov|Příbram|26256|49.5893|14.2215
Milešovice|Vyškov|68354|49.0828|16.8544
Milešín|Žďár nad Sázavou|59451|49.3685|16.2017
Milhostov|Cheb|35002|50.1562|12.4533
Miličín|Benešov|25786|49.5708|14.6615
Milonice|Blansko|67922|49.3666|16.5685
Milonice|Vyškov|68333|49.1595|17.0712
Milostín|Rakovník|27004|50.1938|13.6692
Milotice|Hodonín|69605|48.9559|17.1414
Milotice nad Bečvou|Přerov|75367|49.5366|17.8399
Milotice nad Opavou|Bruntál|79201|49.9958|17.5422
Milovice|Břeclav|69188|48.8526|16.6982
Milovice|Nymburk|28924|50.2261|14.8887
Milovice u Hořic|Jičín|50801|50.3299|15.6311
Miloňovice|Strakonice|38601|49.2207|13.9585
Milíkov|Cheb|35002|50.0559|12.5477
Milíkov|Frýdek-Místek|73981|49.5857|18.7195
Milín|Příbram|26231|49.632|14.0461
Milínov|Plzeň-jih|33204|49.6432|13.566
Milíčov|Jihlava|58805|49.3956|15.3931
Milíčovice|Znojmo|66902|48.8917|15.9324
Milíře|Tachov|34701|49.7964|12.5508
Milý|Rakovník|27054|50.2328|13.8671
Milčice|Nymburk|28911|50.1055|14.9918
Mimoň|Česká Lípa|47124|50.6558|14.725
Minice|Písek|39804|49.4899|14.0122
Mirkovice|Český Krumlov|38232|48.8111|14.3914
Miroslav|Znojmo|67172|48.9478|16.3126
Miroslavské Knínice|Znojmo|67172|48.9779|16.3224
Mirotice|Písek|39801|49.4292|14.0371
Mirovice|Písek|39806|49.5157|14.0359
Mirošov|Jihlava|58805|49.3895|15.4635
Mirošov|Žďár nad Sázavou|59255|49.4657|16.1556
Mirošov|Rokycany|33843|49.6879|13.6582
Mirošovice|Praha-východ|25166|49.9099|14.7113
Miskovice|Kutná Hora|28501|49.9462|15.2048
Mistrovice|Ústí nad Orlicí|56164|50.0238|16.5716
Mistřice|Uherské Hradiště|68712|49.0868|17.5361
Mičovice|Prachatice|38301|48.9836|14.1252
Miřejovice|Litoměřice|41201|50.5533|14.109
Miřetice|Chrudim|53955|49.8414|15.8848
Miřetice|Benešov|25765|49.659|14.9766
Mišovice|Písek|39804|49.4954|14.005
Mladecko|Opava|74754|49.8983|17.7083
Mladeč|Olomouc|78321|49.7059|17.0196
Mladkov|Ústí nad Orlicí|56167|50.097|16.627
Mladotice|Plzeň-sever|33141|49.9853|13.3645
Mladoňovice|Třebíč|67532|49.0102|15.6437
Mladoňovice|Chrudim|53821|49.8875|15.724
Mladošovice|České Budějovice|37901|48.9406|14.6992
Mladá Boleslav|Mladá Boleslav|29301|50.4135|14.9085
Mladá Vožice|Tábor|39143|49.5332|14.8087
Mladé Buky|Trutnov|54223|50.6065|15.8336
Mladé Bříště|Pelhřimov|39443|49.4916|15.3353
Mladý Smolivec|Plzeň-jih|33501|49.5064|13.7354
Mladějov|Jičín|50745|50.4822|15.2327
Mladějov na Moravě|Svitavy|56935|49.8227|16.5912
Mladějovice|Olomouc|78501|49.7525|17.2315
Mlečice|Rokycany|33808|49.9204|13.6961
Mlázovice|Jičín|50758|50.412|15.5217
Mlékojedy|Litoměřice|41201|50.527|14.1193
Mlékosrby|Hradec Králové|50351|50.1918|15.5016
Mlýnské Struhadlo|Klatovy|33901|49.4321|13.4696
Mlýny|Tábor|39201|49.3363|14.8771
Mnetěš|Litoměřice|41301|50.3657|14.2818
Mnich|Pelhřimov|39492|49.2985|14.9658
Mnichov|Strakonice|38601|49.3022|13.8302
Mnichov|Cheb|35301|50.037|12.787
Mnichov|Domažlice|34522|49.4968|12.7645
Mnichovice|Benešov|25765|49.6687|15.0397
Mnichovice|Praha-východ|25164|49.9361|14.7092
Mnichovo Hradiště|Mladá Boleslav|29501|50.527|14.9721
Mníšek|Liberec|46331|50.8317|15.0564
Mníšek pod Brdy|Praha-západ|25210|49.8666|14.2619
Mochov|Praha-východ|25087|50.1419|14.7951
Mochtín|Klatovy|33901|49.3605|13.357
Modlany|Teplice|41713|50.6506|13.8954
Modletice|Praha-východ|25101|49.9703|14.5912
Modlíkov|Havlíčkův Brod|58222|49.6083|15.7704
Modrava|Klatovy|34192|49.0242|13.4994
Modrá|Uherské Hradiště|68706|49.1121|17.4035
Modrá Hůrka|České Budějovice|37501|49.1801|14.5258
Modřice|Brno-venkov|66442|49.128|16.6145
Modřišice|Semily|51101|50.5742|15.1194
Modřovice|Příbram|26242|49.6175|13.9565
Mohelnice|Šumperk|78985|49.7771|16.9196
Mohelnice|Plzeň-jih|33501|49.4809|13.6418
Mohelnice nad Jizerou|Mladá Boleslav|29413|50.5599|14.9776
Mohelno|Třebíč|67575|49.1142|16.1903
Mojné|Český Krumlov|38232|48.8348|14.4074
Mokošín|Pardubice|53501|50.0149|15.572
Mokrosuky|Klatovy|34201|49.2755|13.4549
Mokrouše|Plzeň-město|33201|49.7152|13.5247
Mokrovousy|Hradec Králové|50315|50.2751|15.6859
Mokrovraty|Příbram|26203|49.7958|14.2502
Mokrá-Horákov|Brno-venkov|66404|49.2229|16.7517
Mokré|Rychnov nad Kněžnou|51771|50.2593|16.0665
Mokré Lazce|Opava|74762|49.9047|18.0296
Mokrý Lom|České Budějovice|37401|48.8449|14.5142
Moldava|Teplice|41781|50.7207|13.6573
Moravany|Brno-venkov|66448|49.1457|16.5763
Moravany|Hodonín|69650|49.0402|17.1691
Moravany|Pardubice|53372|50.001|15.9408
Moravec|Žďár nad Sázavou|59254|49.4402|16.1434
Moravecké Pavlovice|Žďár nad Sázavou|59262|49.4255|16.2564
Moraveč|Pelhřimov|39301|49.4092|15.077
Moravice|Opava|74784|49.8579|17.7202
Moravičany|Šumperk|78982|49.757|16.9605
Moravskoslezský Kočov|Bruntál|79201|49.9605|17.4412
Moravská Nová Ves|Břeclav|69155|48.8031|17.0138
Moravská Třebová|Svitavy|57101|49.7577|16.6636
Moravské Bránice|Brno-venkov|66464|49.0834|16.4364
Moravské Budějovice|Třebíč|67602|49.0522|15.8087
Moravské Knínice|Brno-venkov|66434|49.2934|16.5018
Moravské Málkovice|Vyškov|68201|49.257|17.0908
Moravský Beroun|Olomouc|79305|49.7938|17.4422
Moravský Krumlov|Znojmo|67201|49.049|16.3118
Moravský Písek|Hodonín|69685|48.9903|17.3328
Moravský Žižkov|Břeclav|69101|48.833|16.9315
Morašice|Znojmo|67171|48.9576|16.209
Morašice|Chrudim|53802|49.9348|15.7091
Morašice|Pardubice|53501|50.002|15.4861
Morašice|Svitavy|56951|49.8678|16.2337
Morkovice-Slížany|Kroměříž|76833|49.2499|17.2097
Morkůvky|Břeclav|69172|48.9662|16.8623
Morávka|Frýdek-Místek|73904|49.5962|18.5248
Most|Most|43401|50.5017|13.633
Mostek|Trutnov|54475|50.4863|15.6963
Mostek|Ústí nad Orlicí|56501|50.0095|16.2651
Mostkovice|Prostějov|79802|49.4722|17.0522
Mosty u Jablunkova|Frýdek-Místek|73998|49.5275|18.7543
Mouchnice|Hodonín|68333|49.1118|17.1356
Moutnice|Brno-venkov|66455|49.0493|16.7375
Mouřínov|Vyškov|68501|49.1216|16.9786
Močerady|Domažlice|34561|49.5181|13.0736
Močovice|Kutná Hora|28601|49.9064|15.3483
Mořice|Prostějov|79828|49.3306|17.197
Mořina|Beroun|26717|49.9529|14.2087
Mořinka|Beroun|26718|49.9391|14.2373
Mořkov|Nový Jičín|74272|49.5369|18.0598
Mošnov|Nový Jičín|74251|49.6891|18.1326
Mratín|Praha-východ|25063|50.2032|14.5511
Mrač|Benešov|25721|49.8298|14.6906
Mrlínek|Kroměříž|76861|49.4285|17.6784
Mrsklesy|Olomouc|78365|49.6027|17.4017
Mrtník|Plzeň-sever|33152|49.8955|13.3123
Mrzky|Kolín|28201|50.0447|14.8101
Mrákotín|Jihlava|58854|49.1896|15.3762
Mrákotín|Chrudim|53901|49.8147|15.9568
Mrákov|Domažlice|34501|49.4033|12.9513
Mukařov|Mladá Boleslav|29501|50.5692|14.9258
Mukařov|Praha-východ|25162|49.9913|14.7417
Mutkov|Olomouc|79351|49.802|17.2848
Mutějovice|Rakovník|27007|50.1944|13.7096
Mutěnice|Strakonice|38601|49.2398|13.8966
Mutěnice|Hodonín|69611|48.9042|17.0293
Mutěnín|Domažlice|34525|49.5449|12.7447
Mydlovary|České Budějovice|37349|49.0912|14.3544
Myslejovice|Prostějov|79805|49.4065|17.0277
Mysletice|Jihlava|58856|49.1427|15.3895
Mysletín|Pelhřimov|39601|49.4767|15.3683
Mysliboř|Jihlava|58862|49.2095|15.4845
Myslibořice|Třebíč|67560|49.103|15.9847
Myslinka|Plzeň-sever|33023|49.7481|13.2191
Myslkovice|Tábor|39116|49.2992|14.7457
Myslovice|Klatovy|33901|49.4069|13.3871
Mysločovice|Zlín|76301|49.2561|17.5663
Myslín|Písek|39804|49.5322|14.0274
Myslív|Klatovy|34101|49.4143|13.5725
Myštice|Strakonice|38801|49.4533|13.9702
Myštěves|Hradec Králové|50315|50.2977|15.5575
Málkov|Beroun|26701|49.8883|14.0237
Málkov|Chomutov|43001|50.4463|13.3335
Máslojedy|Hradec Králové|50303|50.297|15.7589
Máslovice|Praha-východ|25069|50.2087|14.379
Míchov|Blansko|67961|49.5241|16.6159
Mírov|Šumperk|78901|49.7982|16.8476
Mírová|Karlovy Vary|35735|50.2373|12.7701
Mírová pod Kozákovem|Semily|51101|50.5916|15.1944
Místo|Chomutov|43158|50.4472|13.2674
Míčov-Sušice|Chrudim|53803|49.9051|15.6059
Mířkov|Domažlice|34601|49.5893|12.8816
Míškovice|Kroměříž|76852|49.2767|17.5491
Míšov|Plzeň-jih|33563|49.6227|13.7259
Mýto|Rokycany|33805|49.7892|13.7347
Měchenice|Praha-západ|25206|49.9083|14.3894
Měcholupy|Plzeň-jih|33551|49.5196|13.5328
Měcholupy|Louny|43931|50.2668|13.5375
Měděnec|Chomutov|43184|50.4217|13.1155
Měkynec|Strakonice|38773|49.1584|14.0295
Mělnické Vtelno|Mělník|27738|50.3524|14.6952
Mělník|Mělník|27601|50.354|14.4819
Mělčany|Brno-venkov|66464|49.0762|16.4923
Měník|Hradec Králové|50364|50.2155|15.5283
Měnín|Brno-venkov|66457|49.0825|16.6943
Měrotín|Olomouc|78324|49.6926|17.0018
Měrovice nad Hanou|Přerov|75201|49.3417|17.246
Měrunice|Teplice|41804|50.4805|13.8181
Městec Králové|Nymburk|28903|50.2073|15.2977
Městečko|Rakovník|27023|50.0507|13.8637
Městečko Trnávka|Svitavy|56941|49.7094|16.7275
Město Albrechtice|Bruntál|79395|50.163|17.5749
Město Libavá|Olomouc|78307|49.7216|17.5201
Město Touškov|Plzeň-sever|33033|49.776|13.2512
Měčín|Klatovy|34012|49.4802|13.403
Měňany|Beroun|26727|49.9101|14.1178
Měřín|Žďár nad Sázavou|59442|49.3933|15.8839
Měšice|Praha-východ|25064|50.1981|14.52
Měšín|Jihlava|58601|49.4374|15.6571
Mříčná|Semily|51204|50.6008|15.4689
Mšec|Rakovník|27064|50.2053|13.8984
Mšecké Žehrovice|Rakovník|27064|50.1791|13.9232
Mšeno|Mělník|27735|50.4382|14.6326
Mšené-lázně|Litoměřice|41119|50.3623|14.1272
Mžany|Hradec Králové|50315|50.2965|15.676
Nabočany|Chrudim|53862|49.9439|15.887
Nadryby|Plzeň-sever|33011|49.8208|13.5246
Nadějkov|Tábor|39852|49.5028|14.4793
Nadějov|Jihlava|58827|49.4223|15.7732
Nahořany|Náchod|54907|50.3518|16.0825
Nahošovice|Přerov|75114|49.4378|17.5782
Naloučany|Třebíč|67571|49.2331|16.1353
Nalžovice|Příbram|26293|49.6987|14.3709
Nalžovské Hory|Klatovy|34101|49.3315|13.5466
Napajedla|Zlín|76361|49.1717|17.5121
Narysov|Příbram|26101|49.641|13.971
Nasavrky|Tábor|39131|49.4521|14.6407
Nasavrky|Chrudim|53825|49.8446|15.8047
Nasavrky|Ústí nad Orlicí|56501|50.0256|16.2592
Načeradec|Benešov|25708|49.6103|14.9064
Načešice|Chrudim|53803|49.9414|15.6289
Našiměřice|Znojmo|67176|48.9686|16.3729
Nebahovy|Prachatice|38401|49.0059|14.0524
Nebanice|Cheb|35002|50.1154|12.4721
Nebovidy|Brno-venkov|66448|49.1414|16.5515
Nebovidy|Kolín|28002|49.9916|15.2196
Nebužely|Mělník|27734|50.3904|14.5909
Nebílovy|Plzeň-jih|33204|49.6302|13.4292
Nebřehovice|Strakonice|38601|49.2385|13.9621
Nechanice|Hradec Králové|50315|50.2375|15.6329
Nechvalice|Příbram|26401|49.5766|14.3967
Nechvalín|Hodonín|69631|49.0546|17.0807
Nedabyle|České Budějovice|37006|48.9285|14.515
Nedachlebice|Uherské Hradiště|68712|49.0994|17.5892
Nedakonice|Uherské Hradiště|68738|49.0317|17.3815
Nedašov|Zlín|76332|49.1079|18.0705
Nedašova Lhota|Zlín|76332|49.1214|18.0797
Nedomice|Mělník|27714|50.2598|14.6161
Nedrahovice|Příbram|26401|49.6091|14.4558
Nedvědice|Brno-venkov|59262|49.4571|16.3342
Nedvězí|Svitavy|56992|49.6307|16.301
Neděliště|Hradec Králové|50312|50.2768|15.7856
Nehodiv|Klatovy|34101|49.4109|13.5565
Nehvizdy|Praha-východ|25081|50.1307|14.73
Nejdek|Karlovy Vary|36221|50.3225|12.7295
Nejepín|Havlíčkův Brod|58301|49.7446|15.6007
Nekmíř|Plzeň-sever|33152|49.8582|13.2632
Nekoř|Ústí nad Orlicí|56163|50.0558|16.5513
Nekvasovy|Plzeň-jih|33547|49.4347|13.6258
Nelahozeves|Mělník|27751|50.2616|14.2989
Nelepeč-Žernůvka|Brno-venkov|66601|49.3341|16.3864
Nelešovice|Přerov|75103|49.5108|17.3883
Nemanice|Domažlice|34401|49.4367|12.7206
Nemile|Šumperk|78901|49.8749|16.8476
Nemochovice|Vyškov|68333|49.1805|17.1351
Nemojany|Vyškov|68303|49.2468|16.9136
Nemojov|Trutnov|54461|50.467|15.754
Nemotice|Vyškov|68333|49.1297|17.125
Nemyslovice|Mladá Boleslav|29429|50.3585|14.7639
Nemyčeves|Jičín|50601|50.3845|15.3701
Nemyšl|Tábor|39143|49.5135|14.693
Nenačovice|Beroun|26601|50.0192|14.1391
Nenkovice|Hodonín|69637|49.0032|17.011
Neplachov|České Budějovice|37365|49.1304|14.6011
Neplachovice|Opava|74774|49.9924|17.81
Nepolisy|Hradec Králové|50363|50.1923|15.4635
Nepomuk|Plzeň-jih|33501|49.4863|13.5824
Nepomuk|Příbram|26242|49.6429|13.8374
Nepomyšl|Louny|43971|50.2182|13.3133
Nepoměřice|Kutná Hora|28511|49.8809|15.1489
Neprobylice|Kladno|27375|50.2641|14.0277
Nepřevázka|Mladá Boleslav|29301|50.3784|14.9164
Neratov|Pardubice|53341|50.0799|15.6473
Neratovice|Mělník|27711|50.2594|14.5177
Nerestce|Písek|39804|49.5008|14.0638
Neslovice|Brno-venkov|66491|49.1423|16.3879
Nesovice|Vyškov|68333|49.1512|17.0811
Nespeky|Benešov|25722|49.8594|14.6595
Nestrašovice|Příbram|26272|49.5605|14.0262
Nesuchyně|Rakovník|27007|50.1797|13.688
Nesvačilka|Brno-venkov|66454|49.0641|16.7541
Nesvačily|Beroun|26727|49.8814|14.1245
Netolice|Prachatice|38411|49.0494|14.1971
Netunice|Plzeň-jih|33204|49.6165|13.4307
Netvořice|Benešov|25744|49.8158|14.5184
Netín|Žďár nad Sázavou|59444|49.4131|15.9508
Netřebice|Český Krumlov|38232|48.7909|14.4557
Netřebice|Nymburk|28802|50.2132|15.1429
Neubuz|Zlín|76315|49.2605|17.8255
Neumětely|Beroun|26724|49.8526|14.0367
Neuměř|Domažlice|34562|49.5977|13.0642
Neuměřice|Kladno|27326|50.2418|14.2201
Neurazy|Plzeň-jih|33555|49.4411|13.5157
Neustupov|Benešov|25786|49.6151|14.6987
Nevcehle|Jihlava|58862|49.2258|15.5345
Neveklov|Benešov|25756|49.7538|14.533
Neveklovice|Mladá Boleslav|29413|50.5702|14.9485
Nevid|Rokycany|33701|49.6856|13.6057
Nevojice|Vyškov|68501|49.1354|17.0498
Nevolice|Domažlice|34401|49.4205|12.9333
Nevratice|Jičín|50801|50.347|15.4931
Nevězice|Písek|39804|49.4778|14.1535
Nevřeň|Plzeň-sever|33011|49.8229|13.275
Nezabudice|Rakovník|27023|50.0133|13.8222
Nezabylice|Chomutov|43001|50.4243|13.4786
Nezamyslice|Prostějov|79826|49.3255|17.1734
Nezamyslice|Klatovy|34201|49.2625|13.675
Nezbavětice|Plzeň-město|33204|49.655|13.4772
Nezdenice|Uherské Hradiště|68732|49.0168|17.7523
Nezdice|Plzeň-jih|33401|49.5317|13.3167
Nezdice na Šumavě|Klatovy|34201|49.1727|13.6124
Nezdřev|Plzeň-jih|33544|49.4267|13.7282
Nezvěstice|Plzeň-město|33204|49.6405|13.5197
Nečtiny|Plzeň-sever|33162|49.9749|13.1647
Nečín|Příbram|26213|49.6985|14.2341
Nicov|Prachatice|38473|49.1255|13.6206
Nihošovice|Strakonice|38701|49.1884|13.8618
Nikolčice|Břeclav|69171|48.9933|16.7543
Nimpšov|Třebíč|67541|49.0227|15.7473
Niměřice|Mladá Boleslav|29430|50.3959|14.8085
Niva|Prostějov|79861|49.4453|16.8519
Nivnice|Uherské Hradiště|68751|48.9747|17.6477
Nišovice|Strakonice|38701|49.1553|13.8975
Nižbor|Beroun|26705|49.9991|14.0011
Nižní Lhoty|Frýdek-Místek|73951|49.6486|18.4339
Norberčany|Olomouc|79305|49.754|17.5063
Nosislav|Brno-venkov|69164|49.0139|16.6544
Nosálov|Mělník|27735|50.4736|14.6708
Noviny pod Ralskem|Česká Lípa|47124|50.6922|14.747
Novosedlice|Teplice|41731|50.6564|13.8232
Novosedly|Strakonice|38716|49.2628|13.7976
Novosedly|Břeclav|69182|48.8371|16.4928
Novosedly nad Nežárkou|Jindřichův Hradec|37817|49.0811|14.8223
Nová Buková|Pelhřimov|39301|49.3461|15.2971
Nová Bystřice|Jindřichův Hradec|37833|49.0194|15.1033
Nová Cerekev|Pelhřimov|39415|49.4173|15.1168
Nová Dědina|Kroměříž|76821|49.2102|17.4538
Nová Hradečná|Olomouc|78383|49.8345|17.0775
Nová Lhota|Hodonín|69674|48.861|17.5934
Nová Olešná|Jindřichův Hradec|37853|49.1757|15.1611
Nová Paka|Jičín|50901|50.4946|15.5151
Nová Pec|Prachatice|38462|48.7783|13.9301
Nová Pláň|Bruntál|79201|49.922|17.4752
Nová Role|Karlovy Vary|36225|50.271|12.7843
Nová Sídla|Svitavy|57001|49.884|16.2373
Nová Telib|Mladá Boleslav|29406|50.3913|15.033
Nová Ves|České Budějovice|37315|48.9207|14.5287
Nová Ves|Český Krumlov|38203|48.9484|14.2473
Nová Ves|Strakonice|38719|49.1875|13.7338
Nová Ves|Brno-venkov|66491|49.1082|16.3109
Nová Ves|Sokolov|36464|50.0842|12.7753
Nová Ves|Třebíč|67521|49.2486|15.804
Nová Ves|Žďár nad Sázavou|59451|49.3911|16.1964
Nová Ves|Rychnov nad Kněžnou|51721|50.1308|16.0502
Nová Ves|Liberec|46331|50.8316|15.0012
Nová Ves|Domažlice|34506|49.3665|13.0389
Nová Ves|Plzeň-jih|33441|49.6861|13.2928
Nová Ves|Mělník|27752|50.3129|14.3083
Nová Ves|Praha-východ|25063|50.2193|14.5357
Nová Ves|Louny|44001|50.286|13.8428
Nová Ves I|Kolín|28002|50.0522|15.1446
Nová Ves nad Lužnicí|Jindřichův Hradec|37809|48.8107|14.9257
Nová Ves nad Nisou|Jablonec nad Nisou|46827|50.7252|15.2148
Nová Ves nad Popelkou|Semily|51271|50.5204|15.412
Nová Ves pod Pleší|Příbram|26204|49.8319|14.2753
Nová Ves u Bakova|Mladá Boleslav|29401|50.4908|14.9265
Nová Ves u Chotěboře|Havlíčkův Brod|58273|49.7562|15.6481
Nová Ves u Chýnova|Tábor|39155|49.3928|14.7831
Nová Ves u Jarošova|Svitavy|57001|49.8376|16.16
Nová Ves u Leštiny|Havlíčkův Brod|58282|49.786|15.404
Nová Ves u Mladé Vožice|Tábor|39143|49.5431|14.7481
Nová Ves u Nového Města na Moravě|Žďár nad Sázavou|59231|49.54|16.0842
Nová Ves u Světlé|Havlíčkův Brod|58291|49.6489|15.4378
Nová Ves v Horách|Most|43545|50.5948|13.4826
Nová Včelnice|Jindřichův Hradec|37842|49.2395|15.0727
Nová Říše|Jihlava|58865|49.1395|15.5637
Nové Bránice|Brno-venkov|66464|49.0712|16.4419
Nové Dvory|Žďár nad Sázavou|59212|49.5645|15.809
Nové Dvory|Kutná Hora|28531|49.9707|15.325
Nové Dvory|Příbram|26203|49.8033|14.357
Nové Dvory|Litoměřice|41301|50.4477|14.1795
Nové Hamry|Karlovy Vary|36221|50.3601|12.7195
Nové Heřminovy|Bruntál|79201|50.0236|17.5283
Nové Hrady|České Budějovice|37333|48.7897|14.7785
Nové Hrady|Ústí nad Orlicí|53945|49.8518|16.1439
Nové Hutě|Prachatice|38501|49.0388|13.6458
Nové Lublice|Opava|74901|49.8629|17.6781
Nové Mitrovice|Plzeň-jih|33563|49.5797|13.6837
Nové Město|Hradec Králové|50351|50.1478|15.4952
Nové Město na Moravě|Žďár nad Sázavou|59231|49.5615|16.0743
Nové Město nad Metují|Náchod|54901|50.3447|16.1516
Nové Město pod Smrkem|Liberec|46365|50.925|15.2295
Nové Sady|Vyškov|68308|49.4089|16.902
Nové Sady|Žďár nad Sázavou|59501|49.2938|16.1934
Nové Sedlice|Opava|74706|49.9022|18.0013
Nové Sedlo|Sokolov|35734|50.2066|12.7381
Nové Sedlo|Louny|43801|50.3397|13.4749
Nové Strašecí|Rakovník|27101|50.1528|13.9005
Nové Syrovice|Třebíč|67541|49.0177|15.7736
Nové Veselí|Žďár nad Sázavou|59214|49.5199|15.9086
Nový Bor|Česká Lípa|47301|50.7577|14.5557
Nový Bydžov|Hradec Králové|50401|50.2416|15.4909
Nový Dvůr|Nymburk|28932|50.2381|15.0222
Nový Dům|Rakovník|26901|50.0882|13.831
Nový Hrozenkov|Vsetín|75604|49.3371|18.198
Nový Hrádek|Náchod|54922|50.3574|16.2445
Nový Jimramov|Žďár nad Sázavou|59242|49.6347|16.1873
Nový Jičín|Nový Jičín|74101|49.5944|18.0136
Nový Jáchymov|Beroun|26703|49.9809|13.9433
Nový Knín|Příbram|26203|49.7881|14.2937
Nový Kostel|Cheb|35134|50.2171|12.4454
Nový Kramolín|Domažlice|34401|49.4774|12.8051
Nový Malín|Šumperk|78803|49.9427|17.032
Nový Oldřichov|Česká Lípa|47113|50.7655|14.4423
Nový Ples|Náchod|55101|50.3213|15.9493
Nový Poddvorov|Hodonín|69616|48.8684|16.9611
Nový Přerov|Břeclav|69181|48.8097|16.4938
Nový Rychnov|Pelhřimov|39404|49.3836|15.3663
Nový Telečkov|Třebíč|67505|49.3213|15.9385
Nový Vestec|Praha-východ|25075|50.1839|14.7204
Nový Šaldorf-Sedlešovice|Znojmo|67181|48.8302|16.0607
Nošovice|Frýdek-Místek|73951|49.6608|18.4264
Nupaky|Praha-východ|25101|49.9941|14.6023
Nučice|Praha-východ|28163|49.9556|14.8845
Nučice|Praha-západ|25216|50.0186|14.2301
Nyklovice|Žďár nad Sázavou|59265|49.604|16.345
Nymburk|Nymburk|28802|50.1857|15.0438
Náchod|Náchod|54701|50.4147|16.1657
Náklo|Olomouc|78332|49.6547|17.1298
Nákří|České Budějovice|37348|49.119|14.3294
Náměšť na Hané|Olomouc|78344|49.6022|17.0655
Náměšť nad Oslavou|Třebíč|67571|49.2056|16.1558
Nárameč|Třebíč|67503|49.2645|15.9748
Násedlovice|Hodonín|69636|49.0123|16.9603
Návojná|Zlín|76332|49.1084|18.0531
Návsí|Frýdek-Místek|73992|49.5873|18.7592
Níhov|Brno-venkov|59455|49.3418|16.2576
Nítkovice|Kroměříž|76813|49.2037|17.166
Nížkov|Žďár nad Sázavou|59212|49.5327|15.8059
Nížkovice|Vyškov|68401|49.1096|16.9018
Nýdek|Frýdek-Místek|73995|49.6562|18.757
Nýrov|Blansko|67972|49.5281|16.5393
Nýrsko|Klatovy|34022|49.294|13.1436
Nýřany|Plzeň-sever|33023|49.7128|13.2047
Němčany|Vyškov|68401|49.1645|16.9195
Němčice|Prachatice|38411|49.0319|14.2714
Němčice|Strakonice|38719|49.1928|13.8002
Němčice|Blansko|67951|49.4501|16.7181
Němčice|Pardubice|53352|50.093|15.8059
Němčice|Svitavy|56118|49.8907|16.3433
Němčice|Domažlice|34506|49.4252|13.0776
Němčice|Kolín|28002|50.0845|15.2941
Němčice|Mladá Boleslav|29442|50.3469|14.9267
Němčice|Kroměříž|76843|49.3648|17.4978
Němčice nad Hanou|Prostějov|79827|49.3419|17.2061
Němčičky|Brno-venkov|66466|49.0505|16.5007
Němčičky|Břeclav|69107|48.9357|16.8244
Němčičky|Znojmo|67153|48.9423|16.0885
Němčovice|Rokycany|33824|49.877|13.575
Němětice|Strakonice|38701|49.1947|13.8791
Obecnice|Příbram|26221|49.7163|13.9474
Obora|Blansko|67901|49.4523|16.6057
Obora|Plzeň-sever|33151|49.8896|13.4137
Obora|Tachov|34701|49.8147|12.5378
Obora|Louny|44001|50.3734|13.8631
Oborná|Bruntál|79201|50.0032|17.497
Obory|Příbram|26301|49.6805|14.2165
Obořiště|Příbram|26212|49.7424|14.152
Obrataň|Pelhřimov|39412|49.4252|14.9436
Obrnice|Most|43521|50.5051|13.6955
Obrubce|Mladá Boleslav|29404|50.448|15.0637
Obruby|Mladá Boleslav|29403|50.4602|15.0824
Obytce|Klatovy|33901|49.3905|13.3784
Obyčtov|Žďár nad Sázavou|59101|49.5|16.0017
Občov|Příbram|26101|49.7132|14.067
Obědkovice|Prostějov|79823|49.3949|17.2276
Obědovice|Hradec Králové|50351|50.1612|15.5822
Obříství|Mělník|27742|50.296|14.4785
Ochoz|Prostějov|79852|49.6002|16.9151
Ochoz u Brna|Brno-venkov|66402|49.2543|16.7373
Ochoz u Tišnova|Brno-venkov|67923|49.4257|16.3943
Ocmanice|Třebíč|67571|49.2332|16.1254
Odolena Voda|Praha-východ|25070|50.2335|14.4109
Odrava|Cheb|35002|50.1032|12.4842
Odrovice|Brno-venkov|66464|49.0109|16.5091
Odry|Nový Jičín|74235|49.6626|17.831
Odunec|Třebíč|67555|49.1203|16.0144
Odřepsy|Nymburk|28907|50.1442|15.1888
Ohaveč|Jičín|50601|50.4497|15.3088
Ohaře|Kolín|28130|50.0979|15.2951
Ohařice|Jičín|50601|50.4544|15.2585
Ohnišov|Rychnov nad Kněžnou|51784|50.3227|16.2139
Ohnišťany|Hradec Králové|50354|50.3296|15.5111
Ohníč|Teplice|41765|50.5871|13.8448
Ohrazenice|Semily|51101|50.5977|15.1261
Ohrazenice|Příbram|26223|49.7871|13.9598
Ohrobec|Praha-západ|25245|49.9418|14.4321
Ohrozim|Prostějov|79803|49.4866|17.0207
Okarec|Třebíč|67502|49.2061|16.088
Okna|Česká Lípa|47162|50.5276|14.6711
Okounov|Chomutov|43151|50.3623|13.1067
Okoř|Praha-západ|25264|50.162|14.2587
Okrouhlice|Havlíčkův Brod|58231|49.63|15.4909
Okrouhlička|Havlíčkův Brod|58253|49.5345|15.557
Okrouhlo|Praha-západ|25401|49.9189|14.4474
Okrouhlá|Písek|39843|49.4137|14.3644
Okrouhlá|Blansko|68001|49.5076|16.7321
Okrouhlá|Cheb|35002|50.0626|12.4878
Okrouhlá|Česká Lípa|47301|50.7669|14.5277
Okrouhlá Radouň|Jindřichův Hradec|37842|49.2398|15.0172
Okřesaneč|Kutná Hora|28601|49.8525|15.4758
Okřešice|Třebíč|67401|49.2595|15.8521
Okřínek|Nymburk|29001|50.1644|15.1924
Okříšky|Třebíč|67521|49.2455|15.7697
Olbramice|Ostrava-město|74283|49.7897|18.0891
Olbramice|Olomouc|78322|49.6136|17.0016
Olbramkostel|Znojmo|67151|48.9218|15.9497
Olbramov|Tachov|34901|49.8435|12.8669
Olbramovice|Znojmo|67176|48.9849|16.4025
Olbramovice|Benešov|25901|49.6733|14.641
Oldřichov|Tábor|39143|49.5588|14.7544
Oldřichov|Přerov|75111|49.4976|17.5393
Oldřichov v Hájích|Liberec|46331|50.8497|15.0838
Oldřichovice|Zlín|76361|49.1819|17.5614
Oldřiš|Svitavy|56982|49.7272|16.1938
Oldřišov|Opava|74733|49.9914|17.9608
Oleksovice|Znojmo|67162|48.9022|16.2485
Olešenka|Havlíčkův Brod|58222|49.549|15.7659
Oleška|Praha-východ|28162|49.9717|14.9168
Oleško|Litoměřice|41201|50.4807|14.1966
Olešnice|České Budějovice|37331|48.8413|14.7049
Olešnice|Blansko|67974|49.5577|16.4218
Olešnice|Hradec Králové|50351|50.1424|15.4451
Olešnice|Rychnov nad Kněžnou|51736|50.1443|16.1486
Olešnice|Semily|51101|50.545|15.1193
Olešnice v Orlických horách|Rychnov nad Kněžnou|51783|50.3733|16.31
Olešná|Písek|39843|49.3463|14.3106
Olešná|Havlíčkův Brod|58001|49.6817|15.5478
Olešná|Pelhřimov|39301|49.4458|15.2638
Olešná|Beroun|26764|49.7805|13.8101
Olešná|Rakovník|26901|50.1286|13.696
Olešník|České Budějovice|37350|49.1072|14.3639
Olomouc|Olomouc|77900|49.5939|17.251
Olomučany|Blansko|67903|49.331|16.6718
Olovnice|Mělník|27326|50.2347|14.2405
Oloví|Sokolov|35707|50.2512|12.5589
Olšany|Vyškov|68301|49.2481|16.8662
Olšany|Jihlava|58856|49.1862|15.5661
Olšany|Šumperk|78962|49.9652|16.859
Olšany|Klatovy|34101|49.4009|13.627
Olšany u Prostějova|Prostějov|79814|49.5365|17.1647
Olšovec|Přerov|75301|49.5902|17.7173
Olšovice|Prachatice|38411|49.0569|14.236
Olší|Brno-venkov|59261|49.4214|16.2903
Olší|Jihlava|58856|49.1555|15.3733
Omice|Brno-venkov|66441|49.17|16.4518
Omlenice|Český Krumlov|38241|48.7259|14.4437
Ondratice|Prostějov|79807|49.363|17.0638
Ondřejov|Pelhřimov|39301|49.393|15.1781
Ondřejov|Praha-východ|25165|49.9047|14.7843
Onomyšl|Kutná Hora|28504|49.8993|15.1244
Onšov|Znojmo|67102|48.9054|15.8343
Onšov|Pelhřimov|39501|49.5783|15.1365
Opatov|Jihlava|58805|49.4311|15.3944
Opatov|Třebíč|67528|49.2244|15.6618
Opatov|Svitavy|56912|49.8251|16.5047
Opatovec|Svitavy|56802|49.8054|16.4802
Opatovice|Brno-venkov|66461|49.0751|16.6411
Opatovice|Přerov|75356|49.4993|17.7393
Opatovice I|Kutná Hora|28601|49.8552|15.2486
Opatovice nad Labem|Pardubice|53345|50.1455|15.7906
Opava|Opava|74601|49.9408|17.8949
Opařany|Tábor|39161|49.3969|14.4815
Oplany|Praha-východ|28163|49.9243|14.8674
Oplocany|Přerov|75101|49.4097|17.2603
Oplot|Plzeň-jih|33401|49.58|13.2743
Opolany|Nymburk|28907|50.1308|15.2171
Oponešice|Třebíč|67532|49.0378|15.6521
Opočnice|Nymburk|28904|50.1726|15.2578
Opočno|Rychnov nad Kněžnou|51773|50.2675|16.1149
Opočno|Louny|44001|50.3116|13.7353
Oprostovice|Přerov|75354|49.47|17.6204
Orel|Chrudim|53821|49.9194|15.8391
Orlické Podhůří|Ústí nad Orlicí|56201|50.0034|16.3507
Orlické Záhoří|Rychnov nad Kněžnou|51764|50.2788|16.475
Orličky|Ústí nad Orlicí|56155|50.0316|16.6816
Orlovice|Vyškov|68201|49.2392|17.0937
Orlová|Karviná|73511|49.8702|18.4251
Orlík nad Vltavou|Písek|39807|49.51|14.1656
Oráčov|Rakovník|27032|50.1116|13.549
Osek|Písek|39901|49.4434|14.2999
Osek|Strakonice|38601|49.3184|13.9633
Osek|Jičín|50743|50.4639|15.1596
Osek|Rokycany|33821|49.7781|13.591
Osek|Beroun|26762|49.8197|13.8586
Osek|Teplice|41705|50.6226|13.6915
Osek nad Bečvou|Přerov|75122|49.5113|17.5284
Oselce|Plzeň-jih|33546|49.4373|13.6729
Osečany|Příbram|26401|49.6978|14.4377
Oseček|Nymburk|28941|50.1016|15.1487
Osečnice|Rychnov nad Kněžnou|51703|50.2573|16.307
Osečná|Liberec|46352|50.695|14.9215
Osice|Hradec Králové|50326|50.1429|15.6861
Osiky|Brno-venkov|67923|49.4563|16.4217
Osičky|Hradec Králové|50327|50.1436|15.6763
Oskava|Šumperk|78801|49.8953|17.1322
Oskořínek|Nymburk|28932|50.2402|15.0841
Oslavany|Brno-venkov|66412|49.1234|16.3366
Oslavice|Žďár nad Sázavou|59401|49.3409|15.9908
Oslavička|Žďár nad Sázavou|67505|49.3155|15.9669
Oslnovice|Znojmo|67107|48.9322|15.6875
Oslov|Písek|39835|49.3994|14.2121
Osoblaha|Bruntál|79399|50.2753|17.7153
Osov|Beroun|26725|49.8445|14.084
Osová Bítýška|Žďár nad Sázavou|59453|49.3251|16.1686
Osové|Žďár nad Sázavou|59401|49.3253|16.0155
Ostašov|Třebíč|67552|49.1556|15.9181
Ostopovice|Brno-venkov|66449|49.1611|16.5456
Ostrata|Zlín|76311|49.271|17.7669
Ostrava|Ostrava-město|70200|49.821|18.2626
Ostravice|Frýdek-Místek|73914|49.5352|18.3918
Ostrolovský Újezd|České Budějovice|37401|48.8807|14.6007
Ostroměř|Jičín|50752|50.3726|15.5496
Ostrov|Karlovy Vary|36301|50.306|12.9392
Ostrov|Havlíčkův Brod|58401|49.6931|15.3015
Ostrov|Chrudim|53863|49.9727|16.0304
Ostrov|Ústí nad Orlicí|56122|49.9303|16.5406
Ostrov|Benešov|25706|49.6654|14.8512
Ostrov|Příbram|26272|49.6112|14.0146
Ostrov nad Oslavou|Žďár nad Sázavou|59445|49.4869|15.99
Ostrov u Bezdružic|Plzeň-sever|33038|49.9002|13.0421
Ostrov u Macochy|Blansko|67914|49.3825|16.7628
Ostrovačice|Brno-venkov|66481|49.2109|16.4096
Ostrovec|Písek|39833|49.4212|14.1156
Ostrovec-Lhotka|Rokycany|33808|49.9076|13.7282
Ostrovánky|Hodonín|69631|49.0428|17.0804
Ostrožská Lhota|Uherské Hradiště|68723|48.9757|17.4676
Ostrožská Nová Ves|Uherské Hradiště|68722|49.0044|17.4364
Ostružno|Jičín|50601|50.4434|15.2897
Ostružná|Jeseník|78825|50.1853|17.0517
Ostrá|Nymburk|28922|50.1805|14.893
Ostředek|Benešov|25724|49.8349|14.8324
Ostřetice|Klatovy|33901|49.4224|13.347
Ostřetín|Pardubice|53401|50.0447|16.0305
Ostřešany|Pardubice|53002|49.9935|15.8054
Osvračín|Domažlice|34561|49.5133|13.047
Osvětimany|Uherské Hradiště|68742|49.0559|17.2498
Osík|Svitavy|56967|49.8436|16.2848
Osíčko|Kroměříž|76861|49.4311|17.7516
Otaslavice|Prostějov|79806|49.3884|17.0712
Otice|Opava|74781|49.9169|17.8699
Otinoves|Prostějov|79861|49.4213|16.8718
Otmarov|Brno-venkov|66457|49.1006|16.6728
Otmíče|Beroun|26751|49.8691|13.9473
Otnice|Vyškov|68354|49.0865|16.8145
Otov|Domažlice|34522|49.4866|12.8426
Otovice|Karlovy Vary|36001|50.2555|12.8717
Otovice|Náchod|54972|50.5572|16.3877
Otradov|Chrudim|53943|49.7934|16.0436
Otrokovice|Zlín|76502|49.21|17.5309
Otročiněves|Beroun|26703|49.9806|13.9789
Otročín|Karlovy Vary|36401|50.0324|12.8924
Otvice|Chomutov|43111|50.4809|13.4508
Otvovice|Kladno|27327|50.2117|14.273
Otín|Jihlava|58833|49.2666|15.5698
Otín|Žďár nad Sázavou|59401|49.363|15.9067
Otěšice|Plzeň-jih|33401|49.5441|13.2204
Ouběnice|Příbram|26301|49.7177|14.1599
Oucmanice|Ústí nad Orlicí|56201|49.9895|16.2819
Oudoleň|Havlíčkův Brod|58224|49.6594|15.7558
Ovesná Lhota|Havlíčkův Brod|58291|49.7227|15.3842
Ovesné Kladruby|Cheb|35301|49.9531|12.7792
Ovčáry|Kolín|28002|50.0629|15.2396
Ovčáry|Mělník|27714|50.2532|14.614
Oznice|Vsetín|75624|49.4326|17.9174
Očelice|Rychnov nad Kněžnou|51771|50.24|16.0674
Očihov|Louny|43987|50.1987|13.4605
Ořech|Praha-západ|25225|50.0202|14.2967
Ořechov|Brno-venkov|66444|49.1113|16.5234
Ořechov|Jihlava|58862|49.2|15.5321
Ořechov|Žďár nad Sázavou|59452|49.3505|16.139
Ořechov|Uherské Hradiště|68737|49.0307|17.3009
Ošelín|Tachov|34901|49.7721|12.8563
PLZEŇ|Plzeň-město|30100|49.7385|13.3737
PROSTĚJOV|Prostějov|79601|49.4725|17.1069
Paběnice|Kutná Hora|28543|49.8417|15.3024
Pacetluky|Kroměříž|76843|49.3796|17.5659
Paceřice|Liberec|46344|50.6193|15.1136
Pacov|Pelhřimov|39501|49.4709|15.0018
Palkovice|Frýdek-Místek|73941|49.6348|18.3152
Palonín|Šumperk|78983|49.7291|16.9527
Pamětice|Blansko|67961|49.5496|16.6446
Panenská Rozsíčka|Jihlava|58901|49.2527|15.515
Panenské Břežany|Praha-východ|25070|50.2139|14.4402
Panenský Týnec|Louny|43905|50.295|13.9171
Panoší Újezd|Rakovník|27021|50.0361|13.7169
Panské Dubenky|Jihlava|37853|49.2196|15.2659
Paračov|Strakonice|38601|49.2011|13.9947
Pardubice|Pardubice|53002|50.0344|15.7813
Partutovice|Přerov|75301|49.6314|17.7082
Paršovice|Přerov|75355|49.5012|17.7081
Paseka|Olomouc|78397|49.7965|17.2229
Paseky|Písek|39811|49.2517|14.2549
Paseky nad Jizerou|Semily|51247|50.7241|15.4006
Pasečnice|Domažlice|34401|49.3955|12.8935
Paskov|Frýdek-Místek|73921|49.7319|18.2905
Pasohlávky|Brno-venkov|69122|48.9031|16.5437
Pastuchovice|Plzeň-sever|33165|50.0691|13.3823
Pastviny|Ústí nad Orlicí|56401|50.095|16.5663
Patokryje|Most|43401|50.4999|13.7053
Pavlice|Znojmo|67156|48.9716|15.8991
Pavlov|Břeclav|69201|48.8743|16.6724
Pavlov|Havlíčkův Brod|58401|49.6993|15.3326
Pavlov|Jihlava|58833|49.2429|15.5572
Pavlov|Pelhřimov|39301|49.3988|15.2441
Pavlov|Žďár nad Sázavou|59444|49.4508|15.9139
Pavlov|Šumperk|78985|49.7429|16.8794
Pavlov|Kladno|27351|50.0965|14.1672
Pavlovice|Benešov|25801|49.7152|14.9332
Pavlovice u Kojetína|Prostějov|79830|49.3021|17.2126
Pavlovice u Přerova|Přerov|75111|49.4695|17.5479
Pavlíkov|Rakovník|27021|50.0561|13.7365
Pavlínov|Žďár nad Sázavou|59401|49.3482|15.8786
Pazderna|Frýdek-Místek|73951|49.7044|18.4343
Pačejov|Klatovy|34101|49.373|13.6328
Pačlavice|Kroměříž|76834|49.2598|17.169
Pařezov|Domažlice|34401|49.4705|12.8379
Pašinka|Kolín|28002|49.9965|15.1863
Pašovice|Uherské Hradiště|68756|49.0796|17.6444
Pchery|Kladno|27308|50.1939|14.1179
Pec|Domažlice|34401|49.3987|12.8313
Pec pod Sněžkou|Trutnov|54221|50.694|15.7333
Pecka|Jičín|50782|50.4804|15.6083
Pelechy|Domažlice|34401|49.3892|12.9144
Pelhřimov|Pelhřimov|39301|49.4307|15.2231
Pernarec|Plzeň-sever|33036|49.8405|13.1028
Pernink|Karlovy Vary|36236|50.3658|12.7838
Perná|Břeclav|69186|48.8523|16.6245
Pernštejnské Jestřabí|Brno-venkov|59261|49.4064|16.3257
Pertoltice|Liberec|46373|50.9791|15.0765
Pertoltice|Kutná Hora|28522|49.7549|15.1817
Pertoltice pod Ralskem|Česká Lípa|47124|50.68|14.7193
Peruc|Louny|43907|50.3426|13.96
Perálec|Chrudim|53944|49.8269|16.08
Perštejn|Chomutov|43163|50.3818|13.1103
Pesvice|Chomutov|43111|50.4633|13.485
Petkovy|Mladá Boleslav|29404|50.4133|15.0769
Petrohrad|Louny|43985|50.1276|13.4465
Petroupim|Benešov|25601|49.8084|14.7527
Petrov|Blansko|67962|49.5338|16.4897
Petrov|Hodonín|69665|48.8821|17.2782
Petrov|Praha-západ|25281|49.8865|14.4338
Petrov nad Desnou|Šumperk|78816|50.0055|17.0444
Petrovice|Blansko|67902|49.412|16.6999
Petrovice|Znojmo|67201|49.0068|16.2926
Petrovice|Třebíč|67521|49.2413|15.7877
Petrovice|Hradec Králové|50355|50.2899|15.5986
Petrovice|Bruntál|79384|50.239|17.4485
Petrovice|Ústí nad Orlicí|56301|49.9882|16.5416
Petrovice|Příbram|26255|49.5544|14.3375
Petrovice|Rakovník|27035|50.0674|13.6393
Petrovice|Ústí nad Labem|40337|50.7891|13.9763
Petrovice I|Kutná Hora|28601|49.8111|15.2973
Petrovice II|Kutná Hora|28522|49.81|15.0635
Petrovice u Karviné|Karviná|73572|49.896|18.5479
Petrovice u Sušice|Klatovy|34201|49.2188|13.4409
Petrovičky|Jičín|50801|50.2991|15.6075
Petráveč|Žďár nad Sázavou|59401|49.3276|16.0412
Petrůvka|Zlín|76321|49.105|17.8101
Petrůvky|Třebíč|67552|49.1593|15.9024
Petřvald|Karviná|73541|49.8311|18.3895
Petřvald|Nový Jičín|74260|49.7072|18.1515
Petříkov|České Budějovice|37401|48.8471|14.7547
Petříkov|Praha-východ|25169|49.9253|14.6171
Peč|Jindřichův Hradec|38001|49.0579|15.3925
Pečice|Příbram|26232|49.6005|14.1056
Pečky|Kolín|28911|50.0905|15.0303
Peřimov|Semily|51204|50.6194|15.444
Pikárec|Žďár nad Sázavou|59253|49.4325|16.1225
Pila|Karlovy Vary|36001|50.1798|12.926
Pilníkov|Trutnov|54242|50.5326|15.8203
Pitín|Uherské Hradiště|68771|49.0384|17.8508
Pivkovice|Strakonice|38773|49.1776|14.0697
Pivín|Prostějov|79824|49.3848|17.1849
Pičín|Příbram|26225|49.7455|14.0579
Pištín|České Budějovice|37346|49.046|14.3353
Plandry|Jihlava|58841|49.4201|15.5384
Planá|České Budějovice|37001|48.9438|14.4529
Planá|Tachov|34815|49.8683|12.7439
Planá nad Lužnicí|Tábor|39111|49.3545|14.7016
Plasy|Plzeň-sever|33101|49.9346|13.3905
Plav|České Budějovice|37007|48.9015|14.488
Plaveč|Znojmo|67132|48.9289|16.0801
Plavsko|Jindřichův Hradec|37802|49.0847|14.9041
Plavy|Jablonec nad Nisou|46846|50.7033|15.3175
Plazy|Mladá Boleslav|29301|50.4141|14.9751
Plaňany|Kolín|28104|50.0502|15.0295
Plch|Pardubice|53345|50.1289|15.7028
Plchov|Kladno|27375|50.2553|13.9867
Plchovice|Ústí nad Orlicí|56501|50.0452|16.1813
Plenkovice|Znojmo|67151|48.919|16.0026
Plesná|Cheb|35135|50.2208|12.3468
Pletený Újezd|Kladno|27351|50.1094|14.1162
Pleše|Jindřichův Hradec|37821|49.1956|14.8215
Plešnice|Plzeň-sever|33033|49.7741|13.1768
Ploskovice|Litoměřice|41142|50.5603|14.1986
Pluhův Žďár|Jindřichův Hradec|37821|49.224|14.8928
Plumlov|Prostějov|79803|49.4662|17.0151
Plužná|Mladá Boleslav|29423|50.4738|14.8043
Plánice|Klatovy|34034|49.39|13.4712
Pláně|Plzeň-sever|33101|49.9338|13.3897
Plískov|Rokycany|33808|49.8427|13.7399
Pnětluky|Louny|44001|50.2504|13.7039
Poběžovice|Domažlice|34522|49.5104|12.8027
Poběžovice u Holic|Pardubice|53401|50.0977|16.0008
Poběžovice u Přelouče|Pardubice|53501|49.9911|15.582
Pochvalov|Rakovník|27055|50.2275|13.7944
Pocinovice|Domažlice|34509|49.3435|13.1336
Podbořanský Rohozec|Louny|44101|50.2165|13.2629
Podbořany|Louny|44101|50.2295|13.412
Podbrdy|Beroun|26727|49.8631|14.1267
Podbřezí|Rychnov nad Kněžnou|51803|50.26|16.2149
Podbřežice|Vyškov|68301|49.2126|16.9282
Podhorní Újezd a Vojice|Jičín|50754|50.3902|15.5145
Podhořany u Ronova|Chrudim|53841|49.9362|15.5368
Podhradní Lhota|Kroměříž|76871|49.4208|17.7952
Podhradí|Cheb|35201|50.2555|12.2019
Podhradí|Jičín|50601|50.4186|15.3106
Podhradí|Zlín|76326|49.14|17.7741
Podhradí nad Dyjí|Znojmo|67106|48.9003|15.6865
Podivice|Vyškov|68321|49.3658|17.0108
Podivín|Břeclav|69145|48.8256|16.8483
Podkopná Lhota|Zlín|76318|49.3059|17.8315
Podlesí|Ústí nad Orlicí|56201|50.0203|16.2811
Podlesí|Příbram|26101|49.6904|13.9819
Podlešín|Kladno|27325|50.2211|14.1604
Podluhy|Beroun|26801|49.8157|13.9136
Podmoklany|Havlíčkův Brod|58264|49.7216|15.7678
Podmokly|Klatovy|34201|49.2302|13.5783
Podmokly|Rokycany|33808|49.9433|13.7045
Podmoky|Havlíčkův Brod|58282|49.8304|15.4391
Podmoky|Nymburk|28904|50.1916|15.2323
Podmolí|Znojmo|66902|48.8507|15.9402
Podmyče|Znojmo|67106|48.8877|15.7823
Podolanka|Praha-východ|25073|50.1592|14.601
Podolí|Brno-venkov|66403|49.1905|16.7209
Podolí|Žďár nad Sázavou|59255|49.4844|16.0806
Podolí|Přerov|75116|49.4455|17.5303
Podolí|Uherské Hradiště|68604|49.0409|17.5296
Podolí|Vsetín|75644|49.4304|17.8573
Podolí I|Písek|39843|49.3613|14.312
Podomí|Vyškov|68304|49.3448|16.8333
Podsedice|Litoměřice|41115|50.4721|13.9484
Podveky|Kutná Hora|28506|49.8251|14.9941
Poděbrady|Nymburk|29001|50.1425|15.119
Poděvousy|Domažlice|34561|49.5276|13.1312
Poděšín|Žďár nad Sázavou|59212|49.5078|15.801
Podůlšany|Pardubice|53345|50.1289|15.7383
Podůlší|Jičín|50601|50.4691|15.3406
Pohled|Havlíčkův Brod|58221|49.6062|15.6482
Pohledy|Svitavy|56802|49.695|16.5606
Pohleď|Havlíčkův Brod|58291|49.6036|15.6483
Pohnánec|Tábor|39143|49.4737|14.8028
Pohnání|Tábor|39143|49.4776|14.8112
Pohorovice|Strakonice|38901|49.1887|14.1352
Pohorská Ves|Český Krumlov|38283|48.67|14.6477
Pohořelice|Brno-venkov|69123|48.9813|16.5246
Pohořelice|Zlín|76361|49.1767|17.538
Pohoří|Rychnov nad Kněžnou|51801|50.2923|16.0991
Pohoří|Praha-západ|25401|49.9|14.5251
Pojbuky|Tábor|39143|49.4959|14.8968
Pokojov|Žďár nad Sázavou|59214|49.4817|15.9066
Pokojovice|Třebíč|67521|49.2197|15.7425
Pokřikov|Chrudim|53901|49.7969|15.9883
Polepy|Kolín|28002|50.0048|15.2061
Polepy|Litoměřice|41147|50.5057|14.2646
Polerady|Praha-východ|25063|50.2007|14.5935
Polerady|Most|43401|50.4445|13.6528
Polesí|Pelhřimov|39468|49.2932|15.2466
Polevsko|Česká Lípa|47116|50.7868|14.533
Poleň|Klatovy|33901|49.4251|13.1769
Polešovice|Uherské Hradiště|68737|49.034|17.3407
Police|Třebíč|67534|49.2145|15.8836
Police|Šumperk|78973|49.8148|16.9964
Police|Vsetín|75644|49.4568|17.8677
Police nad Metují|Náchod|54954|50.537|16.2336
Polička|Svitavy|57201|49.715|16.266
Poličná|Vsetín|75701|49.4671|17.9439
Polkovice|Přerov|75144|49.3918|17.2593
Polnička|Žďár nad Sázavou|59102|49.6076|15.9164
Polná|Jihlava|58813|49.4871|15.7189
Polná na Šumavě|Český Krumlov|38226|48.8056|14.1315
Polní Chrčice|Kolín|28002|50.1101|15.2968
Polní Voděrady|Kolín|28002|49.9924|15.0953
Polom|Rychnov nad Kněžnou|51741|50.0591|16.306
Polom|Přerov|75364|49.5772|17.8418
Polomí|Prostějov|79855|49.6315|16.9495
Polánka|Plzeň-jih|33501|49.4358|13.5556
Polště|Jindřichův Hradec|37701|49.1065|14.928
Pomezí|Svitavy|56971|49.7104|16.3174
Pomezí nad Ohří|Cheb|35002|50.0862|12.2797
Poniklá|Semily|51242|50.6616|15.4634
Ponědraž|Jindřichův Hradec|37901|49.1161|14.7021
Ponědrážka|Jindřichův Hradec|37901|49.1366|14.7034
Ponětovice|Brno-venkov|66451|49.1523|16.7424
Popelín|Jindřichův Hradec|37855|49.2137|15.184
Popice|Břeclav|69127|48.9274|16.667
Popovice|Brno-venkov|66461|49.1072|16.6162
Popovice|Benešov|25701|49.6955|14.7526
Popovice|Uherské Hradiště|68604|49.0527|17.5272
Popovičky|Praha-východ|25101|49.9626|14.5979
Popůvky|Brno-venkov|66441|49.1775|16.4877
Popůvky|Třebíč|67575|49.1592|16.1275
Postoloprty|Louny|43942|50.3599|13.703
Postupice|Benešov|25701|49.7281|14.7775
Postřekov|Domažlice|34535|49.4584|12.8069
Postřelmov|Šumperk|78969|49.9077|16.9124
Postřelmůvek|Šumperk|78901|49.9227|16.8792
Postřižín|Mělník|25070|50.2331|14.3868
Poteč|Zlín|76601|49.1545|18.0355
Potvorov|Plzeň-sever|33141|50.0161|13.3995
Potěhy|Kutná Hora|28563|49.8695|15.4202
Potštejn|Rychnov nad Kněžnou|51743|50.0822|16.309
Potštát|Přerov|75362|49.637|17.6518
Potůčky|Karlovy Vary|36235|50.4283|12.7366
Poustka|Cheb|35002|50.1403|12.2983
Pouzdřany|Břeclav|69126|48.9345|16.625
Povrly|Ústí nad Labem|40332|50.6729|14.1604
Pozdeň|Kladno|27376|50.2422|13.9437
Pozděchov|Vsetín|75611|49.2333|17.9555
Pozlovice|Zlín|76326|49.1293|17.7694
Pozořice|Brno-venkov|66407|49.2099|16.7908
Pozďatín|Třebíč|67503|49.2359|16.038
Počaply|Příbram|26272|49.5388|13.9836
Počedělice|Louny|44001|50.3719|13.8879
Počenice-Tetětice|Kroměříž|76833|49.2713|17.2282
Počepice|Příbram|26255|49.5961|14.3809
Počátky|Pelhřimov|39464|49.2603|15.2403
Počítky|Žďár nad Sázavou|59101|49.5888|15.972
Poříčany|Kolín|28914|50.1082|14.9183
Poříčí nad Sázavou|Benešov|25721|49.8391|14.6746
Poříčí u Litomyšle|Svitavy|57001|49.7984|16.1939
Pošná|Pelhřimov|39501|49.4589|15.0424
Poštovice|Kladno|27372|50.3128|14.1379
Prace|Brno-venkov|66458|49.1412|16.7655
Pracejovice|Strakonice|38601|49.2573|13.8492
Prachatice|Prachatice|38301|49.011|14.0001
Prachovice|Chrudim|53804|49.8939|15.6288
Prackovice nad Labem|Litoměřice|41133|50.5695|14.0321
Praha|Praha|11000|50.0756|14.4379
Prakšice|Uherské Hradiště|68756|49.069|17.6331
Prameny|Cheb|35301|50.0502|12.7329
Prasek|Hradec Králové|50401|50.2388|15.5487
Praskačka|Hradec Králové|50333|50.173|15.7428
Prasklice|Kroměříž|76833|49.2688|17.1868
Praskolesy|Beroun|26754|49.866|13.9335
Pravice|Znojmo|67178|48.8435|16.3612
Pravlov|Brno-venkov|66464|49.0558|16.4878
Pravonín|Benešov|25709|49.6357|14.9435
Pravy|Pardubice|53341|50.1319|15.6243
Pravčice|Kroměříž|76824|49.3246|17.4956
Pražmo|Frýdek-Místek|73904|49.6089|18.4863
Prlov|Vsetín|75611|49.248|17.9615
Proboštov|Teplice|41712|50.6678|13.8361
Probulov|Písek|39804|49.4929|14.1452
Prodašice|Mladá Boleslav|29404|50.3501|15.1168
Prokopov|Znojmo|67154|48.9984|15.8961
Proruby|Rychnov nad Kněžnou|51741|50.0707|16.2955
Prosenice|Přerov|75121|49.4889|17.4843
Prosenická Lhota|Příbram|26401|49.6897|14.4828
Prosetín|Žďár nad Sázavou|59264|49.5264|16.3949
Prosetín|Chrudim|53976|49.8331|15.9578
Proseč|Pelhřimov|39601|49.6008|15.3292
Proseč|Chrudim|53944|49.806|16.1163
Proseč pod Ještědem|Liberec|46343|50.7018|15.0171
Proseč pod Křemešníkem|Pelhřimov|39301|49.4153|15.295
Prosečné|Trutnov|54373|50.5621|15.6874
Prosiměřice|Znojmo|67161|48.9028|16.1921
Prostiboř|Tachov|34901|49.6524|12.894
Prostějovičky|Prostějov|79803|49.4276|16.9973
Prostřední Bečva|Vsetín|75656|49.4362|18.2521
Prostřední Poříčí|Blansko|67962|49.5721|16.4975
Prosíčka|Havlíčkův Brod|58401|49.7246|15.3236
Protivanov|Prostějov|79848|49.4836|16.836
Protivín|Písek|39811|49.1996|14.2173
Provodov|Zlín|76345|49.1604|17.7369
Provodov-Šonov|Náchod|54908|50.3822|16.115
Provodovice|Přerov|75353|49.4511|17.7683
Provodín|Česká Lípa|47167|50.6179|14.6014
Prusice|Praha-východ|28163|49.9685|14.878
Prusinovice|Kroměříž|76842|49.3791|17.5872
Prusy-Boškůvky|Vyškov|68201|49.2585|17.0638
Prušánky|Hodonín|69621|48.8285|16.9808
Prysk|Česká Lípa|47115|50.7961|14.468
Prádlo|Plzeň-jih|33501|49.5035|13.5416
Práče|Znojmo|67161|48.8771|16.2013
Prášily|Klatovy|34201|49.1052|13.378
Prštice|Brno-venkov|66446|49.1151|16.4709
Průhonice|Praha-západ|25243|50.0018|14.5604
Pržno|Frýdek-Místek|73911|49.6136|18.3617
Pržno|Vsetín|75623|49.3876|17.943
Pstruží|Frýdek-Místek|73911|49.5649|18.3476
Psárov|Tábor|39201|49.319|14.9056
Psáry|Praha-západ|25244|49.9363|14.5129
Psáře|Benešov|25801|49.7558|14.9619
Ptení|Prostějov|79843|49.5117|16.9612
Ptenín|Plzeň-jih|33452|49.5316|13.1851
Ptice|Praha-západ|25218|50.0529|14.1661
Ptýrov|Mladá Boleslav|29501|50.5049|14.9472
Puchlovice|Hradec Králové|50315|50.1859|15.6264
Puclice|Domažlice|34561|49.5537|13.0195
Pucov|Třebíč|67571|49.2471|16.1742
Puklice|Jihlava|58831|49.375|15.7004
Pulečný|Jablonec nad Nisou|46802|50.6755|15.168
Pustiměř|Vyškov|68321|49.3226|17.028
Pustina|Ústí nad Orlicí|56601|49.8996|16.105
Pustověty|Rakovník|27023|50.0557|13.8141
Pustá Kamenice|Svitavy|56982|49.7562|16.0859
Pustá Polom|Opava|74769|49.8493|17.998
Pustá Rybná|Svitavy|57201|49.7148|16.1351
Pustějov|Nový Jičín|74243|49.7006|18.004
Putim|Písek|39701|49.2646|14.1191
Putimov|Pelhřimov|39301|49.4139|15.2689
Pyšel|Třebíč|67571|49.2506|16.0665
Pyšely|Benešov|25167|49.8769|14.6772
Páleč|Kladno|27371|50.312|14.0497
Pálovice|Třebíč|67531|49.0056|15.5377
Pátek|Nymburk|29001|50.1656|15.1586
Písařov|Šumperk|78991|50.0051|16.8016
Písek|Písek|39701|49.3036|14.1581
Písek|Hradec Králové|50351|50.1555|15.5018
Písek|Frýdek-Místek|73984|49.5593|18.8024
Písečná|Frýdek-Místek|73991|49.5748|18.7875
Písečná|Jeseník|79082|50.2731|17.2538
Písečná|Ústí nad Orlicí|56170|50.0452|16.4482
Písečné|Jindřichův Hradec|37872|48.965|15.4625
Písečné|Žďár nad Sázavou|59301|49.568|16.2368
Písková Lhota|Mladá Boleslav|29431|50.3678|14.8747
Písková Lhota|Nymburk|29001|50.1314|15.0659
Pístina|Jindřichův Hradec|37802|49.0498|14.9014
Písty|Nymburk|28913|50.1646|15.0014
Píšť|Pelhřimov|39601|49.6018|15.2035
Píšť|Opava|74718|49.9787|18.1936
Píšťany|Litoměřice|41101|50.5193|14.0692
Pěnčín|Jablonec nad Nisou|46821|50.6878|15.236
Pěnčín|Liberec|46345|50.595|15.0762
Pěnčín|Prostějov|79857|49.5673|17.0132
Pětihosty|Praha-východ|25167|49.8865|14.7055
Pětikozly|Mladá Boleslav|29430|50.4115|14.812
Pětipsy|Chomutov|43153|50.3212|13.3498
Pěčice|Mladá Boleslav|29446|50.3513|15.0041
Pěčnov|Prachatice|38301|49.0532|13.9421
Pěčín|Rychnov nad Kněžnou|51757|50.1539|16.4248
Pňov-Předhradí|Kolín|28941|50.0865|15.1476
Pňovany|Plzeň-sever|33033|49.779|13.1219
Pňovice|Olomouc|78401|49.7214|17.1619
PŘEROV|Přerov|75002|49.4566|17.4503
Přeborov|Písek|39901|49.4796|14.3572
Přebuz|Sokolov|35801|50.3659|12.6202
Přechovice|Strakonice|38701|49.1796|13.8949
Přeckov|Třebíč|67505|49.2759|15.9164
Předboj|Praha-východ|25072|50.2255|14.4768
Předenice|Plzeň-jih|33209|49.6245|13.3967
Předhradí|Chrudim|53974|49.8317|16.0385
Předklášteří|Brno-venkov|66602|49.3526|16.4025
Předmíř|Strakonice|38742|49.4894|13.7705
Předměřice nad Jizerou|Mladá Boleslav|29474|50.2556|14.7814
Předměřice nad Labem|Hradec Králové|50302|50.2564|15.8157
Přední Výtoň|Český Krumlov|38273|48.6312|14.1646
Přední Zborovice|Strakonice|38701|49.2186|13.8923
Předotice|Písek|39701|49.365|14.0535
Předslav|Klatovy|33901|49.4476|13.3545
Předslavice|Strakonice|38701|49.1321|13.9352
Předín|Třebíč|67527|49.1984|15.6738
Přehořov|Tábor|39201|49.2477|14.7563
Přehvozdí|Kolín|28163|50.0275|14.8401
Přehýšov|Plzeň-sever|33023|49.7027|13.127
Přelouč|Pardubice|53501|50.0399|15.5604
Přelovice|Pardubice|53341|50.0729|15.6149
Přelíc|Kladno|27305|50.2057|14.046
Přemyslovice|Prostějov|79851|49.5565|16.9559
Přepeře|Semily|51261|50.583|15.1129
Přepeře|Mladá Boleslav|29404|50.4677|15.102
Přepychy|Rychnov nad Kněžnou|51732|50.236|16.1066
Přepychy|Pardubice|53316|50.1065|15.52
Přerov nad Labem|Nymburk|28916|50.1604|14.8251
Přerubenice|Rakovník|27054|50.2173|13.8411
Přeskače|Znojmo|67140|49.0125|16.107
Přestanov|Ústí nad Labem|40317|50.6868|13.9204
Přestavlky|Přerov|75002|49.3904|17.4816
Přestavlky|Chrudim|53862|49.9381|15.9263
Přestavlky|Plzeň-jih|33401|49.5999|13.2445
Přestavlky|Litoměřice|41301|50.4036|14.194
Přestavlky u Čerčan|Benešov|25723|49.8531|14.7442
Převýšov|Hradec Králové|50351|50.1516|15.4105
Přezletice|Praha-východ|25073|50.1553|14.5755
Přešovice|Třebíč|67557|49.0502|16.0614
Přeštice|Plzeň-jih|33401|49.5731|13.3336
Přeštěnice|Písek|39901|49.4798|14.4205
Přešťovice|Strakonice|38601|49.2773|13.9744
Přibice|Brno-venkov|69124|48.9617|16.5734
Přibyslav|Havlíčkův Brod|58222|49.5769|15.7386
Přibyslav|Náchod|54901|50.3737|16.1687
Přibyslavice|Brno-venkov|66483|49.2787|16.2664
Přibyslavice|Třebíč|67521|49.2607|15.7784
Přimda|Tachov|34806|49.675|12.6738
Přistoupim|Kolín|28201|50.0542|14.8787
Přišimasy|Kolín|28201|50.0496|14.764
Přáslavice|Olomouc|78354|49.5875|17.3905
Příbor|Nový Jičín|74258|49.641|18.1451
Příbram|Příbram|26101|49.6855|13.999
Příbram na Moravě|Brno-venkov|66484|49.1956|16.2992
Příbraz|Jindřichův Hradec|37802|49.0515|14.9377
Příchovice|Plzeň-jih|33401|49.5621|13.3395
Přídolí|Český Krumlov|38101|48.7819|14.3523
Příkazy|Olomouc|78333|49.6425|17.1483
Příkosice|Rokycany|33843|49.6684|13.6636
Příkrý|Semily|51301|50.625|15.3646
Přílepy|Rakovník|27001|50.1233|13.6327
Přílepy|Kroměříž|76901|49.3201|17.616
Příluka|Svitavy|53944|49.865|16.1566
Příseka|Havlíčkův Brod|58291|49.6709|15.4257
Přísečná|Český Krumlov|38101|48.8332|14.3455
Přísnotice|Brno-venkov|66463|49.0032|16.6136
Přítluky|Břeclav|69104|48.8551|16.7741
Přívrat|Ústí nad Orlicí|56002|49.9247|16.3971
Přívětice|Rokycany|33828|49.8348|13.6122
Příčina|Rakovník|27035|50.0658|13.6674
Příčovy|Příbram|26401|49.6729|14.3897
Příšov|Plzeň-sever|33011|49.8118|13.3042
Příšovice|Liberec|46346|50.5782|15.084
Příštpo|Třebíč|67551|49.0739|15.935
Pšov|Karlovy Vary|36452|50.0517|13.1708
Pšovlky|Rakovník|27031|50.1079|13.594
Pšánky|Hradec Králové|50315|50.2942|15.621
Rabakov|Mladá Boleslav|29404|50.3858|15.1016
Rabyně|Benešov|25208|49.8143|14.4362
Rabí|Klatovy|34201|49.2808|13.6177
Rabštejnská Lhota|Chrudim|53701|49.9157|15.7682
Racková|Zlín|76001|49.2772|17.625
Radenice|Žďár nad Sázavou|59101|49.4273|16.0647
Radenín|Tábor|39120|49.3695|14.8408
Radešín|Žďár nad Sázavou|59255|49.4704|16.0878
Radešínská Svratka|Žďár nad Sázavou|59233|49.5085|16.0851
Radhostice|Prachatice|38481|49.0795|13.8806
Radhošť|Ústí nad Orlicí|53401|49.9876|16.0761
Radim|Jičín|50712|50.4589|15.4287
Radim|Kolín|28103|50.0702|15.0125
Radimovice|Liberec|46344|50.6265|15.0822
Radimovice u Tábora|Tábor|39131|49.4574|14.6391
Radimovice u Želče|Tábor|39002|49.3774|14.6477
Radiměř|Svitavy|56907|49.6996|16.4314
Radkov|Tábor|39131|49.4659|14.6113
Radkov|Jihlava|58856|49.1453|15.4753
Radkov|Žďár nad Sázavou|59253|49.4232|16.1583
Radkov|Opava|74784|49.8256|17.7703
Radkov|Svitavy|57101|49.7345|16.7416
Radkova Lhota|Přerov|75114|49.4419|17.6207
Radkovice|Plzeň-jih|33401|49.5479|13.3681
Radkovice u Budče|Třebíč|38001|49.0826|15.6218
Radkovice u Hrotovic|Třebíč|67559|49.0705|16.0072
Radkovy|Přerov|75114|49.4362|17.6149
Radnice|Rokycany|33828|49.8569|13.6058
Radomyšl|Strakonice|38731|49.3165|13.9303
Radonice|Praha-východ|25073|50.1432|14.6104
Radonice|Chomutov|43155|50.2981|13.2848
Radonín|Třebíč|67521|49.2798|15.7242
Radostice|Brno-venkov|66446|49.1337|16.4771
Radostná pod Kozákovem|Semily|51263|50.5776|15.2455
Radostov|Hradec Králové|50327|50.2098|15.6637
Radostín|Havlíčkův Brod|58001|49.6618|15.545
Radostín|Žďár nad Sázavou|59101|49.6528|15.8759
Radostín nad Oslavou|Žďár nad Sázavou|59444|49.462|15.9652
Radotice|Třebíč|67532|48.9801|15.5902
Radotín|Přerov|75354|49.4797|17.6328
Radovesice|Litoměřice|41002|50.4111|14.0684
Radovesnice I|Kolín|28002|50.0105|15.151
Radovesnice II|Kolín|28128|50.1042|15.3678
Radošov|Třebíč|67507|49.3351|15.7865
Radošovice|České Budějovice|37341|49.0197|14.273
Radošovice|Strakonice|38601|49.2336|13.8987
Radošovice|Benešov|25726|49.7411|14.8677
Radslavice|Vyškov|68321|49.323|17.0039
Radslavice|Přerov|75111|49.4783|17.5167
Raduň|Opava|74761|49.893|17.9433
Radvanec|Česká Lípa|47301|50.753|14.5922
Radvanice|Trutnov|54212|50.5676|16.0618
Radvanice|Přerov|75121|49.5099|17.4773
Radíkov|Přerov|75301|49.5962|17.6723
Radíkovice|Hradec Králové|50327|50.2094|15.6937
Radíč|Příbram|26401|49.7148|14.4175
Radčice|Jablonec nad Nisou|46822|50.6729|15.2777
Radějov|Hodonín|69667|48.8595|17.3447
Radějovice|Strakonice|38773|49.1864|14.0265
Radějovice|Praha-východ|25168|49.9473|14.5649
Radětice|Tábor|39165|49.3195|14.4414
Radětice|Příbram|26231|49.6399|14.0788
Radňoves|Žďár nad Sázavou|59451|49.3887|16.2141
Radňovice|Žďár nad Sázavou|59231|49.5641|16.035
Rajhrad|Brno-venkov|66461|49.0903|16.604
Rajhradice|Brno-venkov|66461|49.0921|16.6294
Rajnochovice|Kroměříž|76871|49.4131|17.8133
Rakousy|Semily|51101|50.6204|15.1876
Rakov|Přerov|75354|49.4918|17.7079
Rakovice|Písek|39804|49.4713|14.0547
Rakovník|Rakovník|26901|50.1062|13.7398
Raková|Rokycany|33701|49.7004|13.5821
Raková u Konice|Prostějov|79857|49.6073|16.9509
Rakvice|Břeclav|69103|48.8582|16.8134
Rakůvka|Prostějov|79857|49.6101|16.9381
Ralsko|Česká Lípa|47124|50.5863|14.8036
Rantířov|Jihlava|58841|49.4083|15.5153
Raná|Chrudim|53972|49.7965|15.9642
Raná|Louny|43924|50.4117|13.7794
Rančířov|Jihlava|58601|49.3626|15.5886
Rapotice|Třebíč|67573|49.1923|16.2534
Rapotín|Šumperk|78814|50.0008|17.0191
Rapšach|Jindřichův Hradec|37807|48.8793|14.933
Rasošky|Náchod|55221|50.322|15.9118
Raspenava|Liberec|46401|50.9043|15.1148
Rataje|Tábor|39165|49.3502|14.4458
Rataje|Benešov|25801|49.7042|14.9705
Rataje|Kroměříž|76812|49.2714|17.3357
Rataje nad Sázavou|Kutná Hora|28507|49.8419|14.9568
Ratboř|Kolín|28141|49.9782|15.1593
Ratenice|Kolín|28911|50.0917|15.0594
Ratiboř|Jindřichův Hradec|37701|49.1436|14.9151
Ratiboř|Vsetín|75621|49.3678|17.9151
Ratibořské Hory|Tábor|39142|49.4628|14.7699
Ratměřice|Benešov|25703|49.6434|14.7563
Ratíškovice|Hodonín|69602|48.9201|17.1657
Razová|Bruntál|79201|49.9314|17.5321
Račetice|Chomutov|43801|50.3053|13.365
Račice|Třebíč|67555|49.1081|16.0247
Račice|Žďár nad Sázavou|59255|49.4974|16.1394
Račice|Rakovník|27024|50.0248|13.923
Račice|Litoměřice|41108|50.4614|14.3512
Račice nad Trotinou|Hradec Králové|50303|50.3158|15.7962
Račice-Pístovice|Vyškov|68305|49.276|16.8729
Račiněves|Litoměřice|41301|50.3732|14.2187
Račín|Žďár nad Sázavou|59211|49.6176|15.867
Raškovice|Frýdek-Místek|73904|49.6198|18.473
Rašov|Brno-venkov|67923|49.4156|16.4538
Rašovice|Vyškov|68501|49.1211|16.9483
Rašovice|Kutná Hora|28504|49.8826|15.1025
Rašín|Jičín|50801|50.3334|15.678
Ražice|Písek|39822|49.241|14.1018
Rebešovice|Brno-venkov|66461|49.1052|16.6353
Rejchartice|Šumperk|78701|50.0283|16.978
Rejštejn|Klatovy|34192|49.1406|13.5153
Rešice|Znojmo|67173|49.0535|16.1716
Roblín|Praha-západ|25226|49.9619|14.2487
Rochlov|Plzeň-sever|33023|49.7308|13.146
Rochov|Litoměřice|41301|50.4595|14.1175
Rodinov|Pelhřimov|39470|49.2829|15.1039
Rodkov|Žďár nad Sázavou|59251|49.504|16.2277
Rodná|Tábor|39143|49.4903|14.8426
Rodvínov|Jindřichův Hradec|37701|49.1711|15.0571
Rohatec|Hodonín|69601|48.8805|17.1834
Rohatsko|Mladá Boleslav|29404|50.4404|15.1048
Rohenice|Rychnov nad Kněžnou|51771|50.3094|16.0322
Rohle|Šumperk|78974|49.8608|17.0138
Rohov|Opava|74725|50.0157|18.0715
Rohovládova Bělá|Pardubice|53343|50.1063|15.6063
Rohozec|Brno-venkov|67923|49.3904|16.483
Rohozec|Kutná Hora|28401|49.9761|15.3847
Rohoznice|Jičín|50771|50.3917|15.6997
Rohoznice|Pardubice|53341|50.1273|15.6644
Rohozná|Jihlava|58844|49.3503|15.3993
Rohozná|Svitavy|56972|49.6537|16.408
Rohy|Třebíč|67505|49.3056|16.0057
Rojetín|Brno-venkov|59451|49.3667|16.2575
Rokle|Chomutov|43201|50.3533|13.2988
Rokycany|Rokycany|33701|49.7382|13.593
Rokytnice|Přerov|75104|49.466|17.3913
Rokytnice|Zlín|76321|49.0662|17.9115
Rokytnice nad Jizerou|Semily|51244|50.7292|15.4488
Rokytnice nad Rokytnou|Třebíč|67525|49.1845|15.773
Rokytnice v Orlických horách|Rychnov nad Kněžnou|51761|50.1648|16.4658
Rokytno|Pardubice|53304|50.1048|15.8894
Rokytovec|Mladá Boleslav|29430|50.4066|14.8308
Rokytá|Mladá Boleslav|29501|50.5638|14.8693
Rokytňany|Jičín|50723|50.3759|15.1375
Ronov nad Doubravou|Chrudim|53842|49.8884|15.5315
Ropice|Frýdek-Místek|73961|49.7055|18.6136
Roprachtice|Semily|51301|50.6476|15.4223
Roseč|Jindřichův Hradec|37846|49.1279|14.9108
Rosice|Brno-venkov|66501|49.1824|16.388
Rosice|Chrudim|53834|49.9224|15.9514
Rosička|Jindřichův Hradec|37821|49.2797|14.954
Rosička|Žďár nad Sázavou|59212|49.5387|15.8427
Rosovice|Příbram|26211|49.7568|14.1091
Rostoklaty|Kolín|28171|50.0743|14.8016
Rostěnice-Zvonovice|Vyškov|68201|49.2384|16.9661
Rotava|Sokolov|35701|50.2964|12.5735
Roubanina|Blansko|67961|49.6155|16.5942
Rouchovany|Třebíč|67557|49.0705|16.1077
Roudnice|Hradec Králové|50327|50.1763|15.6518
Roudnice nad Labem|Litoměřice|41301|50.4253|14.2606
Roudno|Bruntál|79201|49.8961|17.5136
Roudná|Tábor|39201|49.3045|14.7187
Roudné|České Budějovice|37007|48.935|14.4875
Roupov|Plzeň-jih|33453|49.5387|13.249
Rouské|Přerov|75353|49.4718|17.7793
Rousměrov|Žďár nad Sázavou|59101|49.4578|16.0326
Rousínov|Vyškov|68301|49.2014|16.8823
Rovensko|Šumperk|78901|49.9078|16.8763
Rovensko pod Troskami|Semily|51263|50.5354|15.2595
Rovečné|Žďár nad Sázavou|59265|49.5777|16.3627
Rovná|Strakonice|38601|49.2864|13.9541
Rovná|Sokolov|35601|50.1045|12.6689
Rovná|Pelhřimov|39501|49.5103|15.1295
Rozdrojovice|Brno-venkov|66434|49.2547|16.51
Rozhovice|Chrudim|53803|49.9673|15.7136
Rozhraní|Svitavy|56903|49.6018|16.5335
Rozkoš|Znojmo|67153|49.0287|15.9778
Rozseč|Jihlava|58866|49.156|15.6167
Rozseč|Žďár nad Sázavou|59451|49.3602|16.2195
Rozseč nad Kunštátem|Blansko|67973|49.5245|16.4631
Rozsochatec|Havlíčkův Brod|58272|49.6726|15.6339
Rozsochy|Žďár nad Sázavou|59257|49.5203|16.2002
Rozstání|Prostějov|79862|49.3978|16.8405
Rozstání|Svitavy|57101|49.7351|16.7202
Rozsíčka|Blansko|67974|49.5524|16.4671
Roztoky|Praha-západ|25263|50.1585|14.3977
Roztoky|Rakovník|27023|50.0268|13.868
Roztoky u Jilemnice|Semily|51231|50.5639|15.4999
Roztoky u Semil|Semily|51301|50.6585|15.3716
Rozvadov|Tachov|34806|49.6683|12.552
Ročov|Louny|43967|50.2535|13.7745
Roštín|Kroměříž|76803|49.1889|17.2862
Roštění|Kroměříž|76843|49.367|17.5386
Rožmberk nad Vltavou|Český Krumlov|38218|48.6544|14.3653
Rožmitál na Šumavě|Český Krumlov|38292|48.7015|14.3884
Rožmitál pod Třemšínem|Příbram|26242|49.6019|13.8658
Rožnov|Náchod|55101|50.3381|15.8614
Rožnov pod Radhoštěm|Vsetín|75661|49.4586|18.1431
Rožná|Žďár nad Sázavou|59252|49.4774|16.2386
Rožďalovice|Nymburk|28934|50.3049|15.1697
Rpety|Beroun|26801|49.8284|13.9386
Rtyně nad Bílinou|Teplice|41762|50.6036|13.9088
Rtyně v Podkrkonoší|Trutnov|54233|50.5053|16.072
Ruda|Žďár nad Sázavou|59401|49.3226|16.1228
Ruda|Rakovník|27101|50.1409|13.8758
Ruda nad Moravou|Šumperk|78963|49.9811|16.8779
Rudice|Blansko|67906|49.3373|16.7259
Rudice|Uherské Hradiště|68732|49.0562|17.7376
Rudimov|Zlín|76321|49.0798|17.8283
Rudka|Brno-venkov|66483|49.2426|16.3311
Rudlice|Znojmo|67153|48.9486|16.0658
Rudná|Svitavy|56904|49.6592|16.5734
Rudná|Praha-západ|25219|50.0351|14.2345
Rudná pod Pradědem|Bruntál|79331|50.0205|17.3775
Rudník|Trutnov|54372|50.5787|15.737
Rudolec|Žďár nad Sázavou|59214|49.4769|15.8303
Rudolfov|České Budějovice|37371|48.9935|14.5419
Rudoltice|Ústí nad Orlicí|56125|49.8984|16.57
Rudíkov|Třebíč|67505|49.2881|15.946
Rumburk|Děčín|40801|50.9535|14.5553
Ruprechtov|Vyškov|68304|49.3287|16.8515
Rusava|Kroměříž|76841|49.3485|17.6892
Rusín|Bruntál|79397|50.2099|17.7343
Rušinov|Havlíčkův Brod|58301|49.792|15.6832
Rybitví|Pardubice|53354|50.0602|15.7048
Rybnice|Plzeň-sever|33151|49.9084|13.3738
Rybniště|Děčín|40751|50.8801|14.5151
Rybná nad Zdobnicí|Rychnov nad Kněžnou|51755|50.1086|16.366
Rybné|Jihlava|58827|49.423|15.7364
Rybník|Ústí nad Orlicí|56002|49.8887|16.4745
Rybník|Domažlice|34525|49.5129|12.6769
Rybníky|Znojmo|67201|49.0264|16.2795
Rybníky|Příbram|26301|49.7527|14.206
Rybníček|Vyškov|68201|49.274|17.0739
Rybníček|Havlíčkův Brod|58282|49.7695|15.5091
Rybí|Nový Jičín|74265|49.6008|18.076
Rychnov na Moravě|Svitavy|56934|49.8292|16.6402
Rychnov nad Kněžnou|Rychnov nad Kněžnou|51601|50.1661|16.2778
Rychnov u Jablonce nad Nisou|Jablonec nad Nisou|46802|50.6839|15.1499
Rychnovek|Náchod|55225|50.3575|15.9704
Rychvald|Karviná|73532|49.8663|18.3764
Ryjice|Ústí nad Labem|40331|50.6881|14.0921
Rymice|Kroměříž|76901|49.342|17.5263
Rynholec|Rakovník|27062|50.138|13.9223
Rynoltice|Liberec|46353|50.7891|14.8189
Rynárec|Pelhřimov|39401|49.3897|15.2348
Ryžoviště|Bruntál|79356|49.8757|17.3583
Ráby|Pardubice|53352|50.0729|15.8026
Rácovice|Třebíč|67532|49.0211|15.687
Rádlo|Jablonec nad Nisou|46803|50.6986|15.1159
Rájec|Šumperk|78901|49.8566|16.9031
Rájec-Jestřebí|Blansko|67902|49.4104|16.641
Ráječko|Blansko|67902|49.3934|16.6414
Rýmařov|Bruntál|79501|49.9319|17.2719
Růžená|Jihlava|58901|49.2705|15.4285
Růžová|Děčín|40502|50.8423|14.2939
Růžďka|Vsetín|75625|49.3941|17.9957
Sadov|Karlovy Vary|36001|50.2672|12.8972
Sadová|Hradec Králové|50315|50.2975|15.7
Sadská|Nymburk|28912|50.1361|14.9864
Salačova Lhota|Pelhřimov|39501|49.5241|14.9803
Salaš|Uherské Hradiště|68706|49.1406|17.3429
Samopše|Kutná Hora|28506|49.8615|14.9295
Samotišky|Olomouc|77900|49.6305|17.3282
Samšina|Jičín|50601|50.4594|15.235
Samšín|Pelhřimov|39501|49.4857|15.0618
Sazená|Kladno|27324|50.3053|14.2874
Sazomín|Žďár nad Sázavou|59101|49.5089|15.9811
Sazovice|Zlín|76301|49.241|17.5688
Sběř|Jičín|50703|50.3202|15.4245
Schořov|Kutná Hora|28601|49.8582|15.38
Sebečice|Rokycany|33808|49.87|13.6923
Sebranice|Blansko|67931|49.497|16.5746
Sebranice|Svitavy|56962|49.7715|16.2493
Sedlatice|Jihlava|58856|49.1924|15.6135
Sedlec|České Budějovice|37347|49.0729|14.2866
Sedlec|Břeclav|69121|48.779|16.694
Sedlec|Třebíč|67571|49.1677|16.1348
Sedlec|Plzeň-sever|33141|50.0064|13.4273
Sedlec|Mladá Boleslav|29471|50.3008|14.7958
Sedlec|Praha-východ|25065|50.1868|14.458
Sedlec|Litoměřice|41115|50.4502|14.0164
Sedlec-Prčice|Příbram|25791|49.5733|14.5331
Sedlejov|Jihlava|58862|49.2276|15.4958
Sedletín|Havlíčkův Brod|58301|49.7086|15.5646
Sedlečko u Soběslavě|Tábor|39201|49.2828|14.743
Sedlice|Strakonice|38732|49.3773|13.9391
Sedlice|Pelhřimov|39601|49.5152|15.2564
Sedlice|Příbram|26242|49.6219|13.8809
Sedliště|Jičín|50723|50.3942|15.2192
Sedliště|Frýdek-Místek|73936|49.7185|18.3688
Sedliště|Svitavy|57001|49.894|16.2749
Sedliště|Plzeň-jih|33501|49.5276|13.6323
Sedlnice|Nový Jičín|74256|49.6578|18.087
Sedloňov|Rychnov nad Kněžnou|51791|50.3384|16.3156
Sedlčany|Příbram|26401|49.6607|14.4267
Sehradice|Zlín|76323|49.1444|17.8243
Sejřek|Žďár nad Sázavou|59262|49.4362|16.3094
Sekeřice|Jičín|50703|50.2865|15.3808
Seletice|Nymburk|28934|50.3204|15.0971
Selmice|Pardubice|53501|50.0502|15.4409
Seloutky|Prostějov|79804|49.4415|17.0634
Semanín|Ústí nad Orlicí|56002|49.8694|16.453
Semechnice|Rychnov nad Kněžnou|51801|50.2603|16.1485
Semice|Nymburk|28917|50.1643|14.8716
Semily|Semily|51301|50.6053|15.3282
Semněvice|Domažlice|34601|49.5979|12.9293
Semtěš|Kutná Hora|28601|49.96|15.5144
Semín|Pardubice|53501|50.0532|15.5198
Semčice|Mladá Boleslav|29446|50.3683|15.007
Sendraž|Náchod|54901|50.3677|16.2022
Sendražice|Hradec Králové|50303|50.29|15.7961
Senec|Rakovník|27036|50.0668|13.707
Senetářov|Blansko|67906|49.3548|16.804
Senice|Nymburk|29001|50.1843|15.2077
Senice na Hané|Olomouc|78345|49.6241|17.0859
Seninka|Vsetín|75611|49.2733|17.9652
Senička|Olomouc|78345|49.6323|17.0564
Senohraby|Praha-východ|25166|49.8955|14.7182
Senomaty|Rakovník|27031|50.0983|13.6538
Senorady|Brno-venkov|67575|49.1244|16.2446
Senožaty|Pelhřimov|39456|49.5692|15.1981
Sentice|Brno-venkov|66603|49.3109|16.4468
Sepekov|Písek|39851|49.4288|14.4183
Sezemice|Pardubice|53304|50.0666|15.8528
Sezemice|Mladá Boleslav|29411|50.5857|15.0052
Sezimovo Ústí|Tábor|39101|49.3853|14.6849
Seč|Chrudim|53807|49.847|15.6565
Seč|Ústí nad Orlicí|56201|50.0256|16.2949
Seč|Plzeň-jih|33601|49.5881|13.505
Sibřina|Praha-východ|25084|50.0567|14.6695
Silůvky|Brno-venkov|66446|49.1061|16.468
Sirá|Rokycany|33701|49.8215|13.7385
Sirákov|Žďár nad Sázavou|59212|49.5049|15.8183
Sivice|Brno-venkov|66407|49.2038|16.7826
Siřejovice|Litoměřice|41002|50.4785|14.071
Skalice|Tábor|39201|49.3035|14.6953
Skalice|Znojmo|67171|48.9645|16.2249
Skalice|Hradec Králové|50303|50.2765|15.8721
Skalice nad Svitavou|Blansko|67901|49.4812|16.6037
Skalice u České Lípy|Česká Lípa|47117|50.7452|14.5307
Skalička|Brno-venkov|66603|49.358|16.5163
Skalička|Přerov|75352|49.5155|17.796
Skalka|Hodonín|69648|49.0359|17.2073
Skalka|Prostějov|79824|49.4032|17.1699
Skalka u Doks|Česká Lípa|47201|50.5637|14.6197
Skalná|Cheb|35134|50.1704|12.3616
Skalsko|Mladá Boleslav|29426|50.4272|14.7591
Skapce|Tachov|34901|49.6571|12.9905
Skašov|Plzeň-jih|33601|49.5106|13.4315
Skaštice|Kroměříž|76701|49.3324|17.4175
Sklené|Žďár nad Sázavou|59101|49.6095|16.007
Sklené|Svitavy|56802|49.7069|16.5306
Sklené nad Oslavou|Žďár nad Sázavou|59101|49.4382|16.0575
Skomelno|Rokycany|33828|49.8475|13.6423
Skopytce|Tábor|39201|49.3316|14.7983
Skorkov|Havlíčkův Brod|58253|49.5085|15.4762
Skorkov|Mladá Boleslav|29474|50.2318|14.7494
Skoronice|Hodonín|69641|48.9814|17.1535
Skorotice|Žďár nad Sázavou|59262|49.4574|16.3592
Skorošice|Jeseník|79065|50.3086|17.0807
Skotnice|Nový Jičín|74258|49.6577|18.1341
Skočice|Strakonice|38775|49.1862|14.1044
Skořenice|Ústí nad Orlicí|56501|50.0314|16.2221
Skořice|Rokycany|33843|49.6778|13.7054
Skrbeň|Olomouc|78335|49.6412|17.1766
Skrchov|Blansko|67961|49.5778|16.5495
Skryje|Brno-venkov|59455|49.3937|16.3108
Skryje|Havlíčkův Brod|58282|49.8438|15.4878
Skryje|Rakovník|27042|49.965|13.7646
Skrýchov u Malšic|Tábor|39175|49.3303|14.5967
Skršín|Most|43401|50.4657|13.7545
Skuhrov|Havlíčkův Brod|58241|49.6848|15.5322
Skuhrov|Jablonec nad Nisou|46822|50.6761|15.2134
Skuhrov|Beroun|26727|49.8734|14.1468
Skuhrov nad Bělou|Rychnov nad Kněžnou|51703|50.2296|16.2924
Skuteč|Chrudim|53973|49.8436|15.9967
Skvrňov|Kolín|28144|49.8972|15.0019
Skály|Písek|39811|49.22|14.1603
Skály|Strakonice|38601|49.1835|13.993
Skřinářov|Žďár nad Sázavou|59453|49.3471|16.1721
Skřipel|Beroun|26724|49.8421|14.0671
Skřipov|Opava|74745|49.8188|17.9106
Skřivany|Hradec Králové|50352|50.2686|15.4993
Skřípov|Prostějov|79852|49.5836|16.8203
Slabce|Rakovník|27041|50.0002|13.7149
Slabčice|Písek|39847|49.3266|14.338
Slaná|Semily|51201|50.5809|15.3298
Slaník|Strakonice|38601|49.2684|13.9517
Slaný|Kladno|27401|50.2306|14.087
Slapsko|Tábor|39143|49.5752|14.7627
Slapy|Tábor|39176|49.387|14.6167
Slapy|Praha-západ|25208|49.8154|14.3962
Slatina|Znojmo|67153|49.0197|16.0185
Slatina|Nový Jičín|74293|49.7908|17.98
Slatina|Svitavy|56943|49.6297|16.6079
Slatina|Ústí nad Orlicí|56601|49.9782|16.1638
Slatina|Klatovy|34101|49.3879|13.7443
Slatina|Plzeň-sever|33141|49.9846|13.634
Slatina|Kladno|27326|50.2243|14.2208
Slatina|Litoměřice|41002|50.4307|14.0382
Slatina nad Zdobnicí|Rychnov nad Kněžnou|51756|50.1339|16.398
Slatina nad Úpou|Náchod|54947|50.4542|16.0367
Slatinice|Olomouc|78342|49.5617|17.1
Slatinky|Prostějov|78342|49.5488|17.0941
Slatiny|Jičín|50601|50.3669|15.3815
Slatiňany|Chrudim|53821|49.9212|15.8139
Slavhostice|Jičín|50732|50.3089|15.3495
Slavičky|Třebíč|67501|49.1749|15.968
Slavičín|Zlín|76321|49.0881|17.8736
Slavkov|Opava|74757|49.9219|17.8365
Slavkov|Uherské Hradiště|68764|48.947|17.6117
Slavkov pod Hostýnem|Kroměříž|76861|49.3772|17.6704
Slavkov u Brna|Vyškov|68401|49.1534|16.8766
Slavníč|Havlíčkův Brod|58255|49.5148|15.4524
Slavonice|Jindřichův Hradec|37881|48.9976|15.3516
Slavoňov|Náchod|54901|50.3439|16.204
Slavošov|Kutná Hora|28522|49.7623|15.1521
Slavíkov|Havlíčkův Brod|58265|49.7429|15.7808
Slavíkovice|Třebíč|67531|49.0044|15.6245
Slavče|České Budějovice|37321|48.7979|14.6151
Slavětice|Třebíč|67555|49.1037|16.1088
Slavětín|Havlíčkův Brod|58263|49.6687|15.7729
Slavětín|Olomouc|78324|49.6747|16.9636
Slavětín|Louny|43909|50.3507|13.9078
Slavětín nad Metují|Náchod|54901|50.329|16.053
Slepotice|Pardubice|53002|49.9922|15.9614
Slezské Pavlovice|Bruntál|79399|50.3098|17.7008
Slezské Rudoltice|Bruntál|79397|50.207|17.6811
Slopné|Zlín|76323|49.1571|17.8472
Sloup|Blansko|67913|49.4149|16.7396
Sloup v Čechách|Česká Lípa|47152|50.739|14.5889
Sloupnice|Svitavy|56553|49.9209|16.3304
Sloupno|Havlíčkův Brod|58301|49.7371|15.7499
Sloupno|Hradec Králové|50353|50.2574|15.5021
Sloveč|Nymburk|28903|50.2299|15.3269
Slověnice|Benešov|25726|49.7574|14.8852
Sluhy|Praha-východ|25063|50.1925|14.5578
Slunečná|Česká Lípa|47301|50.7359|14.4826
Slup|Znojmo|67128|48.7816|16.1993
Slušovice|Zlín|76315|49.2479|17.8016
Sluštice|Praha-východ|25084|50.0391|14.6855
Služovice|Opava|74728|49.9886|17.995
Služátky|Havlíčkův Brod|58291|49.685|15.4315
Smetanova Lhota|Písek|39804|49.4477|14.0873
Smečno|Kladno|27305|50.1885|14.0405
Smidary|Hradec Králové|50353|50.2916|15.4774
Smilkov|Benešov|25789|49.6026|14.6175
Smilovice|Frýdek-Místek|73955|49.6609|18.5719
Smilovice|Mladá Boleslav|29442|50.3066|14.9612
Smilovice|Rakovník|27054|50.247|13.8078
Smilovy Hory|Tábor|39152|49.5365|14.876
Smiřice|Hradec Králové|50303|50.2999|15.8652
Smolnice|Louny|43914|50.3088|13.8486
Smolné Pece|Karlovy Vary|36225|50.2916|12.7654
Smolotely|Příbram|26263|49.6207|14.1357
Smrk|Třebíč|67501|49.2257|16.002
Smrček|Chrudim|53851|49.8685|15.8934
Smrčná|Jihlava|58801|49.4715|15.538
Smržice|Prostějov|79817|49.5058|17.1071
Smržov|Jindřichův Hradec|37901|49.0762|14.6825
Smržov|Hradec Králové|50303|50.2998|15.9179
Smržovka|Jablonec nad Nisou|46851|50.7383|15.2465
Smědčice|Rokycany|33824|49.7992|13.5129
Snovídky|Vyškov|68333|49.1329|17.1064
Snědovice|Litoměřice|41174|50.5036|14.3879
Snět|Benešov|25768|49.6265|15.2269
Sněžné|Žďár nad Sázavou|59203|49.6456|16.1218
Sněžné|Rychnov nad Kněžnou|51801|50.34|16.2774
Sobkovice|Ústí nad Orlicí|56164|50.048|16.5951
Sobotka|Jičín|50743|50.4675|15.1763
Sobotovice|Brno-venkov|66467|49.06|16.5574
Sobotín|Šumperk|78816|50.0118|17.0909
Sobíňov|Havlíčkův Brod|58262|49.7011|15.767
Sobíšky|Přerov|75121|49.5039|17.4509
Sobčice|Jičín|50801|50.3724|15.5149
Soběchleby|Přerov|75354|49.479|17.6516
Soběhrdy|Benešov|25601|49.8211|14.7343
Soběkury|Plzeň-jih|33401|49.5763|13.2391
Soběnov|Český Krumlov|38241|48.7628|14.5458
Soběraz|Jičín|50713|50.4635|15.4021
Soběslav|Tábor|39201|49.26|14.7187
Soběslavice|Liberec|46345|50.605|15.0342
Soběsuky|Kroměříž|76802|49.2337|17.3596
Sobětuchy|Chrudim|53701|49.9333|15.7641
Soběšice|Klatovy|34201|49.2079|13.6842
Soběšovice|Frýdek-Místek|73938|49.725|18.4663
Soběšín|Kutná Hora|28506|49.7912|14.956
Sobůlky|Hodonín|69701|49.0197|17.079
Sojovice|Mladá Boleslav|29475|50.2222|14.7621
Sokoleč|Nymburk|29001|50.0985|15.107
Sokolnice|Brno-venkov|66452|49.114|16.7217
Sokolov|Sokolov|35601|50.1746|12.66
Solenice|Příbram|26263|49.6177|14.1959
Solnice|Rychnov nad Kněžnou|51701|50.2038|16.2377
Sopotnice|Ústí nad Orlicí|56115|50.0591|16.3454
Sopřeč|Pardubice|53316|50.0937|15.5568
Sosnová|Česká Lípa|47001|50.6552|14.5324
Sosnová|Opava|79312|49.9987|17.6631
Sousedovice|Strakonice|38601|49.2322|13.8686
Soutice|Benešov|25771|49.7262|15.053
Souňov|Kutná Hora|28601|49.8801|15.3157
Sovolusky|Pardubice|53501|49.9693|15.5373
Sovínky|Mladá Boleslav|29429|50.3732|14.7872
Sovětice|Hradec Králové|50315|50.3076|15.7059
Spešov|Blansko|67902|49.3949|16.6294
Spojil|Pardubice|53002|50.0423|15.8225
Spomyšl|Mělník|27705|50.3355|14.3606
Spořice|Chomutov|43101|50.441|13.3919
Spytihněv|Zlín|76364|49.1413|17.4982
Spálené Poříčí|Plzeň-jih|33561|49.6138|13.6057
Spálov|Nový Jičín|74237|49.7042|17.7225
Spáňov|Domažlice|34401|49.4146|12.9874
Spělkov|Žďár nad Sázavou|59203|49.6749|16.161
Srbce|Prostějov|79827|49.3024|17.2291
Srbeč|Rakovník|27065|50.2247|13.8835
Srbice|Domažlice|34543|49.5084|13.1187
Srbice|Teplice|41501|50.6608|13.8694
Srbsko|Beroun|26718|49.9373|14.136
Srbská Kamenice|Děčín|40715|50.8205|14.3528
Srby|Domažlice|34601|49.537|12.8684
Srby|Plzeň-jih|33501|49.5191|13.6034
Srch|Pardubice|53352|50.085|15.7635
Srnojedy|Pardubice|53002|50.0392|15.7027
Srní|Klatovy|34192|49.0873|13.4805
Srnín|Český Krumlov|38101|48.8451|14.3438
Srubec|České Budějovice|37006|48.9482|14.5414
Sruby|Ústí nad Orlicí|56544|49.997|16.1744
Stachy|Prachatice|38473|49.1019|13.6667
Stanovice|Karlovy Vary|36001|50.1652|12.8741
Stanovice|Trutnov|54401|50.4007|15.8715
Stanoviště|Brno-venkov|66484|49.2392|16.2536
Starkoč|Kutná Hora|28601|49.9374|15.5077
Starosedlský Hrádek|Příbram|26272|49.5763|14.0083
Starovice|Břeclav|69301|48.9517|16.7067
Starovičky|Břeclav|69301|48.9076|16.7755
Stará Huť|Příbram|26202|49.7824|14.1975
Stará Lysá|Nymburk|28926|50.2247|14.7992
Stará Paka|Jičín|50791|50.5104|15.4946
Stará Ves|Bruntál|79501|49.9585|17.2366
Stará Ves|Přerov|75002|49.3787|17.4882
Stará Ves nad Ondřejnicí|Ostrava-město|73923|49.7275|18.1934
Stará Voda|Cheb|35301|49.9916|12.5959
Stará Voda|Hradec Králové|50351|50.1504|15.5307
Stará Červená Voda|Jeseník|79053|50.3294|17.2013
Stará Říše|Jihlava|58867|49.1797|15.5949
Staré Buky|Trutnov|54101|50.5322|15.8594
Staré Bříště|Pelhřimov|39601|49.4908|15.3626
Staré Hamry|Frýdek-Místek|73915|49.4725|18.4459
Staré Heřminovy|Bruntál|79312|49.9333|17.6258
Staré Hobzí|Jindřichův Hradec|37871|49.0105|15.4533
Staré Hodějovice|České Budějovice|37008|48.9455|14.5211
Staré Hradiště|Pardubice|53352|50.0655|15.779
Staré Hrady|Jičín|50723|50.3861|15.2131
Staré Hutě|Uherské Hradiště|68601|49.1292|17.2778
Staré Jesenčany|Pardubice|53002|50.0006|15.7542
Staré Křečany|Děčín|40761|50.9505|14.4963
Staré Místo|Jičín|50601|50.4051|15.3423
Staré Město|Bruntál|79201|50.0037|17.4322
Staré Město|Frýdek-Místek|73801|49.67|18.3636
Staré Město|Šumperk|78832|50.1618|16.9474
Staré Město|Svitavy|56932|49.7941|16.675
Staré Město|Uherské Hradiště|68603|49.0752|17.4335
Staré Město pod Landštejnem|Jindřichův Hradec|37882|49.0035|15.2542
Staré Sedliště|Tachov|34801|49.7444|12.6943
Staré Sedlo|Sokolov|35601|50.1818|12.7199
Staré Sedlo|Tachov|34802|49.666|12.8637
Staré Smrkovice|Jičín|50801|50.3367|15.4946
Staré Těchanovice|Opava|74901|49.8184|17.6921
Staré Ždánice|Pardubice|53344|50.124|15.7207
Starý Bydžov|Hradec Králové|50357|50.2585|15.4524
Starý Hrozenkov|Uherské Hradiště|68774|48.966|17.8631
Starý Jičín|Nový Jičín|74231|49.577|17.9618
Starý Kolín|Kolín|28123|50.0099|15.294
Starý Mateřov|Pardubice|53002|50.0017|15.7152
Starý Petřín|Znojmo|67106|48.8901|15.7342
Starý Plzenec|Plzeň-město|33202|49.6978|13.4736
Starý Poddvorov|Hodonín|69616|48.8787|16.9816
Starý Vestec|Nymburk|28916|50.1448|14.8465
Starý Šachov|Děčín|40502|50.7152|14.3605
Statenice|Praha-západ|25262|50.1427|14.3186
Stavenice|Šumperk|78973|49.7869|16.9737
Stavěšice|Hodonín|69638|49.0017|17.0306
Staňkov|Jindřichův Hradec|37806|48.9796|14.9528
Staňkov|Domažlice|34561|49.5538|13.0693
Staňkovice|Kutná Hora|28504|49.8755|15.0152
Staňkovice|Litoměřice|41201|50.5895|14.1671
Staňkovice|Louny|43949|50.3499|13.5712
Stařechovice|Prostějov|79841|49.533|17.0538
Stařeč|Třebíč|67522|49.1979|15.828
Staříč|Frýdek-Místek|73943|49.686|18.2729
Stašov|Svitavy|57201|49.675|16.369
Stašov|Beroun|26751|49.8834|13.9576
Stebno|Ústí nad Labem|40002|50.6152|14.0173
Stehelčeves|Kladno|27342|50.1717|14.191
Stehlovice|Písek|39843|49.3935|14.323
Stochov|Kladno|27303|50.1464|13.9636
Stod|Plzeň-jih|33301|49.6392|13.1648
Stojice|Pardubice|53501|49.9565|15.6141
Stojčín|Pelhřimov|39468|49.2378|15.222
Stolany|Chrudim|53803|49.9279|15.7452
Stonava|Karviná|73534|49.817|18.5253
Stonařov|Jihlava|58833|49.2822|15.5857
Stošíkovice na Louce|Znojmo|67161|48.8967|16.215
Stožec|Prachatice|38444|48.8595|13.8215
Stožice|Strakonice|38901|49.1326|14.1503
Strachotice|Znojmo|67129|48.7962|16.1724
Strachotín|Břeclav|69301|48.9055|16.6515
Strachoňovice|Jihlava|58856|49.1352|15.4881
Strachujov|Žďár nad Sázavou|59242|49.6132|16.2269
Stradonice|Kladno|27371|50.2915|14.047
Stradouň|Ústí nad Orlicí|53863|49.9725|16.0657
Strahovice|Opava|74724|50.0022|18.0872
Strakonice|Strakonice|38601|49.2605|13.9104
Strakov|Svitavy|57001|49.8666|16.3669
Straky|Nymburk|28925|50.2337|14.9593
Stranný|Benešov|25756|49.7539|14.4941
Strančice|Praha-východ|25163|49.9482|14.6776
Stratov|Nymburk|28922|50.193|14.9099
Stračov|Hradec Králové|50314|50.3016|15.6408
Strašice|Strakonice|38716|49.2026|13.7297
Strašice|Rokycany|33845|49.7356|13.7577
Straškov-Vodochody|Litoměřice|41184|50.3637|14.2496
Strašnov|Mladá Boleslav|29431|50.3516|14.8893
Strašov|Pardubice|53316|50.0876|15.5228
Strašín|Klatovy|34201|49.1793|13.6405
Stražisko|Prostějov|79844|49.5432|16.9302
Strenice|Mladá Boleslav|29430|50.3927|14.8232
Strhaře|Brno-venkov|67923|49.4357|16.4364
Strmilov|Jindřichův Hradec|37853|49.1586|15.1994
Strojetice|Benešov|25765|49.6516|15.0661
Stropešín|Třebíč|67555|49.1541|16.0774
Struhařov|Benešov|25601|49.7656|14.7623
Struhařov|Praha-východ|25164|49.952|14.7445
Strukov|Olomouc|78401|49.7334|17.1756
Strunkovice nad Blanicí|Prachatice|38426|49.0841|14.0553
Strunkovice nad Volyňkou|Strakonice|38701|49.2086|13.8894
Strupčice|Chomutov|43114|50.4711|13.5306
Stružinec|Semily|51251|50.5509|15.3581
Stružnice|Česká Lípa|47002|50.697|14.4501
Stružná|Karlovy Vary|36471|50.1832|13.0058
Stránecká Zhoř|Žďár nad Sázavou|59442|49.3801|15.9275
Stránka|Mělník|27735|50.4231|14.6612
Strání|Uherské Hradiště|68765|48.9023|17.7068
Stráž|Domažlice|34401|49.4149|12.913
Stráž|Tachov|34802|49.6689|12.7756
Stráž nad Nežárkou|Jindřichův Hradec|37802|49.0698|14.9056
Stráž nad Nisou|Liberec|46303|50.7911|15.0269
Stráž nad Ohří|Karlovy Vary|36301|50.3373|13.0511
Stráž pod Ralskem|Česká Lípa|47127|50.7029|14.8011
Strážek|Žďár nad Sázavou|59253|49.4408|16.1934
Strážiště|Mladá Boleslav|29413|50.5925|14.9293
Strážkovice|České Budějovice|37401|48.8997|14.5695
Strážnice|Hodonín|69662|48.9011|17.3169
Strážná|Ústí nad Orlicí|56301|49.9113|16.7106
Strážné|Trutnov|54352|50.6637|15.6152
Strážný|Prachatice|38443|48.9084|13.7205
Strážov|Klatovy|34021|49.3034|13.2463
Strážovice|Hodonín|69638|49.0093|17.0475
Strýčice1)|České Budějovice|37341|49.0119|14.2661
Studenec|Třebíč|67502|49.2002|16.0649
Studenec|Semily|51233|50.5535|15.5495
Studená|Jindřichův Hradec|37856|49.1853|15.287
Studená|Plzeň-sever|33141|49.9607|13.6431
Studené|Ústí nad Orlicí|56164|50.0667|16.5893
Studený|Benešov|25768|49.6075|15.1278
Studeněves|Kladno|27379|50.2242|14.0445
Studnice|Vyškov|68308|49.3757|16.8811
Studnice|Třebíč|67503|49.2911|16.029
Studnice|Náchod|54948|50.4214|16.09
Studnice|Chrudim|53901|49.7381|15.903
Studánka|Tachov|34701|49.7807|12.6038
Studénka|Nový Jičín|74213|49.7235|18.0786
Stupava|Uherské Hradiště|68601|49.1173|17.2488
Stvolová|Blansko|67961|49.5893|16.5405
Stvolínky|Česká Lípa|47102|50.6324|14.4287
Stádlec|Tábor|39162|49.3797|14.4952
Stáj|Jihlava|58827|49.4581|15.8035
Stálky|Znojmo|67106|48.8702|15.6848
Stárkov|Náchod|54936|50.534|16.1583
Stéblová|Pardubice|53345|50.0921|15.7463
Stínava|Prostějov|79803|49.4953|16.9346
Stěbořice|Opava|74751|49.9372|17.8056
Stěžery|Hradec Králové|50321|50.2158|15.7484
Středokluky|Praha-západ|25268|50.1323|14.2343
Střelice|Brno-venkov|66447|49.1523|16.5041
Střelice|Znojmo|67153|48.9942|15.9833
Střelice|Plzeň-jih|33301|49.6306|13.1347
Střelná|Vsetín|75612|49.1773|18.0979
Střelské Hoštice|Strakonice|38715|49.2977|13.7561
Střemošice|Chrudim|53854|49.8917|16.0722
Střemy|Mělník|27734|50.3843|14.5656
Střevač|Jičín|50722|50.4045|15.2746
Střezetice|Hradec Králové|50312|50.2584|15.7182
Střezimíř|Benešov|25787|49.5321|14.6114
Střeň|Olomouc|78332|49.6916|17.1539
Stříbrnice|Přerov|75201|49.3286|17.2462
Stříbrnice|Uherské Hradiště|68709|49.0567|17.3076
Stříbrná|Sokolov|35801|50.3568|12.5265
Stříbrná Skalice|Praha-východ|28167|49.8978|14.8463
Stříbrné Hory|Havlíčkův Brod|58222|49.6013|15.6911
Stříbro|Tachov|34901|49.753|13.0042
Stříbřec|Jindřichův Hradec|37818|49.03|14.8784
Střílky|Kroměříž|76804|49.1426|17.2112
Střítež|Český Krumlov|38232|48.7757|14.4345
Střítež|Jihlava|58811|49.4436|15.5987
Střítež|Pelhřimov|39301|49.364|15.1266
Střítež|Třebíč|67401|49.1914|15.8934
Střítež|Žďár nad Sázavou|59251|49.4406|16.2568
Střítež|Frýdek-Místek|73959|49.6794|18.5692
Střítež nad Bečvou|Vsetín|75652|49.4587|18.057
Střítež nad Ludinou|Přerov|75363|49.6094|17.739
Střítež pod Křemešníkem|Pelhřimov|39301|49.4341|15.3203
Střížov|České Budějovice|37401|48.8905|14.5278
Střížovice|Jindřichův Hradec|37853|49.14|15.157
Střížovice|Plzeň-jih|33207|49.6119|13.4585
Střížovice|Kroměříž|76821|49.2572|17.4497
Suchdol|Prostějov|79845|49.5473|16.8968
Suchdol|Kutná Hora|28502|49.9526|15.1666
Suchdol nad Lužnicí|Jindřichův Hradec|37806|48.8934|14.8771
Suchdol nad Odrou|Nový Jičín|74201|49.6558|17.9283
Suchodol|Příbram|26101|49.7241|14.0825
Suchohrdly|Znojmo|66902|48.8662|16.0891
Suchohrdly u Miroslavi|Znojmo|67172|48.9432|16.3633
Suchomasty|Beroun|26722|49.8955|14.0567
Suchonice|Olomouc|78357|49.5271|17.382
Suchov|Hodonín|69671|48.9075|17.5636
Suchovršice|Trutnov|54232|50.5235|15.9983
Suchá|Jihlava|58833|49.3011|15.5775
Suchá Lhota|Svitavy|57001|49.8773|16.1736
Suchá Loz|Uherské Hradiště|68753|48.9701|17.7139
Suchý|Blansko|68001|49.4829|16.7625
Suchý Důl|Náchod|54962|50.5402|16.2655
Sudice|Blansko|68001|49.53|16.6686
Sudice|Třebíč|67573|49.182|16.2383
Sudice|Opava|74725|50.0316|18.0685
Sudislav nad Orlicí|Ústí nad Orlicí|56201|49.9894|16.3132
Sudkov|Šumperk|78821|49.9191|16.9453
Sudoměř|Mladá Boleslav|29425|50.4451|14.7395
Sudoměřice|Hodonín|69666|48.8673|17.2569
Sudoměřice u Bechyně|Tábor|39172|49.2898|14.5385
Sudoměřice u Tábora|Tábor|39136|49.5103|14.6586
Sudovo Hlavno|Praha-východ|29476|50.2629|14.6854
Sudslava|Ústí nad Orlicí|56113|50.0407|16.2865
Sudějov|Kutná Hora|28504|49.8608|15.1039
Sukorady|Jičín|50801|50.3255|15.5828
Sukorady|Mladá Boleslav|29406|50.4263|15.0291
Sulejovice|Litoměřice|41111|50.4989|14.0375
Sulice|Praha-východ|25168|49.9257|14.5567
Sulimov|Kroměříž|76821|49.2268|17.423
Sulislav|Tachov|34901|49.7487|13.0728
Sulkovec|Žďár nad Sázavou|59265|49.6094|16.3097
Sulíkov|Blansko|67962|49.5447|16.4897
Supíkovice|Jeseník|79051|50.2978|17.2553
Sušice|Přerov|75111|49.486|17.5375
Sušice|Klatovy|34201|49.2318|13.5205
Sušice|Uherské Hradiště|68704|49.1223|17.4523
Svatava|Sokolov|35703|50.1923|12.6254
Svatobořice-Mistřín|Hodonín|69604|48.9771|17.0894
Svatojanský Újezd|Jičín|50781|50.426|15.543
Svatoslav|Brno-venkov|66601|49.3019|16.3089
Svatoslav|Třebíč|67507|49.3192|15.8486
Svatoňovice|Opava|74787|49.7936|17.6673
Svatá|Beroun|26751|49.9392|13.9617
Svatá Maří|Prachatice|38501|49.0646|13.8315
Svaté Pole|Příbram|26301|49.7514|14.1691
Svatý Jan|Příbram|26256|49.6369|14.3111
Svatý Jan nad Malší|České Budějovice|37323|48.8241|14.5086
Svatý Jan pod Skalou|Beroun|26601|49.969|14.1333
Svatý Jiří|Ústí nad Orlicí|56501|49.9721|16.2704
Svatý Mikuláš|Kutná Hora|28401|49.991|15.3506
Sviadnov|Frýdek-Místek|73925|49.6894|18.3277
Svijanský Újezd|Liberec|46345|50.5873|15.0435
Svijany|Liberec|46346|50.5727|15.064
Svinaře|Beroun|26728|49.8917|14.1844
Svinařov|Kladno|27305|50.1814|14.0504
Svinošice|Blansko|67922|49.3345|16.576
Sviny|Tábor|39181|49.1872|14.636
Sviny|Žďár nad Sázavou|59451|49.3643|16.0851
Svinčany|Pardubice|53501|49.9767|15.6396
Svitavy|Svitavy|56802|49.7553|16.4693
Svitávka|Blansko|67932|49.5019|16.598
Svoboda nad Úpou|Trutnov|54224|50.6261|15.8166
Svobodné Heřmanice|Bruntál|79313|49.9461|17.6744
Svojanov|Svitavy|56973|49.6247|16.4103
Svojek|Semily|50791|50.5535|15.4557
Svojetice|Praha-východ|25162|49.9715|14.7386
Svojetín|Rakovník|27004|50.1901|13.621
Svojkov|Česká Lípa|47153|50.7196|14.5991
Svojkovice|Jihlava|58856|49.1662|15.6356
Svojkovice|Rokycany|33822|49.76|13.6483
Svojšice|Pardubice|53362|49.9654|15.6011
Svojšice|Kolín|28107|50.0032|15.0432
Svojšice|Příbram|26272|49.5728|14.043
Svojšín|Tachov|34901|49.7662|12.9108
Svor|Česká Lípa|47151|50.7919|14.5969
Svrabov|Tábor|39131|49.4476|14.6266
Svratka|Žďár nad Sázavou|59202|49.7108|16.0322
Svratouch|Chrudim|53942|49.7245|16.0343
Svrkyně|Praha-západ|25264|50.1715|14.295
Svárov|Kladno|27351|50.062|14.1506
Svárov|Uherské Hradiště|68712|49.1165|17.6246
Svébohov|Šumperk|78901|49.92|16.8393
Svémyslice|Praha-východ|25091|50.146|14.6482
Svépravice|Pelhřimov|39301|49.4957|15.2328
Svéradice|Klatovy|34101|49.3714|13.7397
Svésedlice|Olomouc|78354|49.5726|17.3813
Svídnice|Rychnov nad Kněžnou|51741|50.0862|16.2234
Svídnice|Chrudim|53824|49.89|15.8138
Světce|Jindřichův Hradec|37821|49.2707|14.9415
Světec|Teplice|41753|50.5762|13.8117
Světice|Praha-východ|25101|49.9702|14.6659
Světlá|Blansko|67963|49.566|16.7183
Světlá Hora|Bruntál|79331|50.0462|17.4
Světlá nad Sázavou|Havlíčkův Brod|58291|49.6681|15.404
Světlá pod Ještědem|Liberec|46343|50.7113|14.986
Světlík|Český Krumlov|38216|48.7318|14.2111
Světnov|Žďár nad Sázavou|59102|49.6206|15.9553
Světí|Hradec Králové|50312|50.2575|15.7756
Sychrov|Liberec|46344|50.6269|15.0888
Synalov|Brno-venkov|67923|49.4328|16.414
Synkov-Slemeno|Rychnov nad Kněžnou|51601|50.1454|16.2191
Syrov|Pelhřimov|39601|49.578|15.1778
Syrovice|Brno-venkov|66467|49.0799|16.5466
Syrovátka|Hradec Králové|50327|50.1549|15.6628
Syrovín|Hodonín|69684|49.0259|17.264
Sytno|Tachov|34901|49.7398|13.0418
Syřenov|Semily|51251|50.4989|15.4278
Sádek|Svitavy|57201|49.6927|16.2257
Sádek|Příbram|26101|49.7333|13.9832
Sány|Nymburk|28906|50.1248|15.2477
Sázava|Žďár nad Sázavou|59211|49.5653|15.9284
Sázava|Ústí nad Orlicí|56301|49.9083|16.641
Sázava|Benešov|28506|49.8717|14.8968
Sázavka|Havlíčkův Brod|58244|49.7345|15.4115
Sýkořice|Rakovník|27024|50.0347|13.9318
Tachlovice|Praha-západ|25217|50.0146|14.2408
Tachov|Česká Lípa|47201|50.5434|14.6386
Tachov|Tachov|34701|49.7989|12.6363
Tanvald|Jablonec nad Nisou|46841|50.7376|15.308
Tasov|Hodonín|69663|48.907|17.4298
Tasov|Žďár nad Sázavou|67579|49.2884|16.0949
Tasovice|Blansko|67971|49.496|16.4416
Tasovice|Znojmo|67125|48.8362|16.1557
Tatce|Kolín|28911|50.0912|14.9773
Tatenice|Ústí nad Orlicí|56131|49.8711|16.6973
Tatiná|Plzeň-sever|33011|49.8487|13.2998
Tatobity|Semily|51253|50.5713|15.2733
Tatrovice|Sokolov|35735|50.2768|12.6974
Tavíkovice|Znojmo|67140|49.0338|16.1033
Tašov|Ústí nad Labem|40002|50.6146|14.1359
Tchořovice|Strakonice|38801|49.4371|13.81
Tehov|Benešov|25801|49.7355|14.9668
Tehov|Praha-východ|25101|49.9716|14.6939
Tehovec|Praha-východ|25162|49.9816|14.7304
Telecí|Svitavy|56994|49.6947|16.1808
Telnice|Brno-venkov|66459|49.102|16.7178
Telnice|Ústí nad Labem|40338|50.7331|13.9579
Telč|Jihlava|58856|49.1833|15.4544
Temelín|České Budějovice|37301|49.1929|14.3488
Temešvár|Písek|39701|49.3565|14.2636
Teplice|Teplice|41501|50.6446|13.8354
Teplice nad Bečvou|Přerov|75301|49.5286|17.7402
Teplice nad Metují|Náchod|54957|50.5944|16.1705
Teplička|Karlovy Vary|36464|50.1487|12.8517
Teplá|Cheb|36461|49.982|12.8632
Teplýšovice|Benešov|25601|49.8062|14.8017
Terezín|Hodonín|69614|48.9556|16.9427
Terezín|Litoměřice|41155|50.5111|14.1507
Terešov|Rokycany|33808|49.8968|13.6998
Tetov|Pardubice|53316|50.0806|15.4457
Tetín|Jičín|50771|50.4246|15.6365
Tetín|Beroun|26601|49.9494|14.1024
Tetčice|Brno-venkov|66417|49.1703|16.4057
Tečovice|Zlín|76302|49.2212|17.5874
Tichonice|Benešov|25763|49.7772|14.9924
Tichov|Zlín|76601|49.1775|17.9827
Tichá|Nový Jičín|74274|49.5701|18.2216
Tis|Havlíčkův Brod|58243|49.7051|15.4933
Tis u Blatna|Plzeň-sever|33165|50.0858|13.3479
Tisem|Benešov|25756|49.7557|14.6081
Tismice|Kolín|28201|50.0563|14.8212
Tisovec|Chrudim|53973|49.8245|15.9147
Tisová|Ústí nad Orlicí|56601|49.9363|16.2246
Tisová|Tachov|34801|49.7653|12.7139
Tisá|Ústí nad Labem|40336|50.7846|14.0314
Tišice|Mělník|27715|50.2699|14.5542
Tišnov|Brno-venkov|66601|49.3488|16.4245
Tišnovská Nová Ves|Brno-venkov|59451|49.384|16.2937
Tištín|Prostějov|79829|49.307|17.1655
Tlumačov|Domažlice|34401|49.4036|12.9291
Tlumačov|Zlín|76362|49.2536|17.4957
Tlustice|Beroun|26801|49.8504|13.8855
Tlučná|Plzeň-sever|33026|49.7244|13.2355
Tmaň|Beroun|26721|49.9072|14.0339
Tochovice|Příbram|26281|49.5956|13.9925
Tojice|Plzeň-jih|33501|49.4926|13.6266
Tomice|Benešov|25768|49.6451|15.1572
Topolany|Vyškov|68201|49.2775|17.0404
Topolná|Uherské Hradiště|68711|49.122|17.5444
Toušice|Kolín|28163|49.988|15.0066
Toužetín|Louny|44001|50.3154|13.8862
Toužim|Karlovy Vary|36401|50.0606|12.9852
Tovačov|Přerov|75101|49.4297|17.2857
Tovéř|Olomouc|78316|49.6401|17.3191
Točník|Beroun|26751|49.8855|13.8829
Traplice|Uherské Hradiště|68704|49.131|17.4363
Travčice|Litoměřice|41201|50.5034|14.1899
Trboušany|Brno-venkov|66464|49.0508|16.4629
Trhanov|Domažlice|34533|49.4203|12.8456
Trhová Kamenice|Chrudim|53952|49.7869|15.816
Trhové Dušníky|Příbram|26101|49.7135|14.0129
Trhové Sviny|České Budějovice|37401|48.8424|14.6393
Trhový Štěpánov|Benešov|25763|49.7116|15.0137
Trmice|Ústí nad Labem|40004|50.643|13.9946
Trnava|Třebíč|67401|49.2548|15.9242
Trnava|Zlín|76318|49.2961|17.842
Trnov|Rychnov nad Kněžnou|51733|50.2448|16.1645
Trnovany|Litoměřice|41201|50.5433|14.1791
Trnová|Plzeň-sever|33013|49.8612|13.324
Trnová|Praha-západ|25210|49.9155|14.3578
Trnové Pole|Znojmo|67178|48.945|16.4096
Trnávka|Nový Jičín|74258|49.6848|18.178
Trnávka|Pardubice|53501|50.0328|15.4611
Trojanovice|Nový Jičín|74401|49.5205|18.2381
Trojovice|Chrudim|53833|49.9329|15.9197
Trokavec|Rokycany|33843|49.647|13.7024
Troskotovice|Brno-venkov|67178|48.9191|16.4376
Troskovice|Semily|51263|50.5117|15.2224
Trotina|Trutnov|54401|50.4097|15.7163
Troubelice|Olomouc|78383|49.8174|17.0811
Troubky|Přerov|75102|49.4322|17.3493
Troubky-Zdislavice|Kroměříž|76802|49.2305|17.2683
Troubsko|Brno-venkov|66441|49.1696|16.5109
Trpišovice|Havlíčkův Brod|58401|49.6553|15.3323
Trpík|Ústí nad Orlicí|56301|49.8476|16.57
Trpín|Svitavy|56974|49.594|16.4022
Trpísty|Tachov|34901|49.8227|13.0586
Trstěnice|Znojmo|67171|48.9869|16.1955
Trstěnice|Cheb|35301|49.9192|12.6761
Trstěnice|Svitavy|56957|49.7942|16.3489
Trubská|Beroun|26601|49.955|13.9936
Trubín|Beroun|26701|49.9438|14.0023
Truskovice|Strakonice|38901|49.1042|14.1612
Trusnov|Pardubice|53401|50.0002|16.0441
Trutnov|Trutnov|54101|50.5655|15.9092
Tršice|Olomouc|78357|49.5412|17.4271
Tržek|Svitavy|57001|49.8863|16.26
Tuchlovice|Kladno|27302|50.1381|13.9913
Tuchoměřice|Praha-západ|25267|50.1355|14.2823
Tuchoraz|Kolín|28201|50.0487|14.8493
Tuchořice|Louny|43969|50.2848|13.6626
Tuhaň|Česká Lípa|47201|50.5366|14.4674
Tuhaň|Mělník|27741|50.2955|14.5174
Tuklaty|Kolín|25082|50.0849|14.7696
Tulešice|Znojmo|67173|49.0386|16.2072
Tuněchody|Chrudim|53701|49.979|15.8413
Tupadly|Kutná Hora|28563|49.8691|15.4036
Tupadly|Mělník|27721|50.4419|14.475
Tupesy|Uherské Hradiště|68707|49.0844|17.3699
Turkovice|Pardubice|53363|49.9526|15.5489
Turnov|Semily|51101|50.5874|15.1569
Turovec|Tábor|39121|49.3785|14.769
Turovice|Přerov|75114|49.4238|17.5809
Tursko|Praha-západ|25265|50.1913|14.322
Tutleky|Rychnov nad Kněžnou|51741|50.134|16.2416
Tučapy|Tábor|39126|49.2914|14.8035
Tučapy|Vyškov|68301|49.2334|16.9185
Tučapy|Uherské Hradiště|68709|49.0482|17.3315
Tučín|Přerov|75116|49.4541|17.5151
Tuř|Jičín|50601|50.3951|15.417
Tuřany|Cheb|35002|50.0841|12.5221
Tuřany|Kladno|27379|50.2323|14.0291
Tuřice|Mladá Boleslav|29474|50.2489|14.7693
Tušovice|Příbram|26272|49.5757|14.0306
Tužice|Klatovy|34142|49.3351|13.5115
Tvarožná|Brno-venkov|66405|49.1919|16.7716
Tvarožná Lhota|Hodonín|69662|48.8773|17.3595
Tvorovice|Prostějov|79823|49.3745|17.222
Tvořihráz|Znojmo|67134|48.9176|16.1359
Tvrdkov|Bruntál|79344|49.8956|17.1782
Tvrdonice|Břeclav|69153|48.7606|16.9946
Tvrzice|Prachatice|38422|49.1218|13.9672
Tymákov|Plzeň-město|33201|49.7192|13.5099
Tábor|Tábor|39002|49.4131|14.6776
Tálín|Písek|39815|49.2477|14.2273
Tísek|Nový Jičín|74301|49.7928|18.0147
Týn nad Bečvou|Přerov|75131|49.517|17.6182
Týn nad Vltavou|České Budějovice|37501|49.2235|14.4207
Týnec|Břeclav|69154|48.7795|17.0133
Týnec|Klatovy|34021|49.3473|13.264
Týnec nad Labem|Kolín|28126|50.0421|15.3585
Týnec nad Sázavou|Benešov|25741|49.8336|14.5899
Týniště|Plzeň-jih|33401|49.5212|13.4177
Týniště nad Orlicí|Rychnov nad Kněžnou|51721|50.1512|16.0786
Týnišťko|Ústí nad Orlicí|56601|49.9995|16.0977
Týček|Rokycany|33808|49.8693|13.7944
Těchařovice|Příbram|26231|49.5995|14.0489
Těchlovice|Hradec Králové|50327|50.208|15.7112
Těchlovice|Děčín|40502|50.6964|14.205
Těchobuz|Pelhřimov|39501|49.5102|14.9307
Těchonín|Ústí nad Orlicí|56166|50.065|16.618
Těmice|Hodonín|69684|49.0016|17.265
Těmice|Pelhřimov|39496|49.3519|15.0605
Těně|Rokycany|33845|49.7513|13.7963
Těrlicko|Karviná|73542|49.7524|18.483
Těšany|Brno-venkov|66454|49.0397|16.7701
Těšetice|Znojmo|67161|48.8889|16.1583
Těšetice|Olomouc|78346|49.5933|17.1262
Těškov|Rokycany|33701|49.8023|13.6981
Těškovice|Opava|74764|49.8142|18.021
Těšovice|Prachatice|38301|49.0572|14.024
Těšovice|Sokolov|35601|50.1823|12.677
Třanovice|Frýdek-Místek|73953|49.7126|18.5293
Třebařov|Svitavy|56933|49.8298|16.7026
Třebechovice pod Orebem|Hradec Králové|50346|50.2011|15.9923
Třebelovice|Třebíč|67532|49.0223|15.6663
Třebenice|Třebíč|67552|49.1639|16.0159
Třebenice|Litoměřice|41113|50.4764|13.9902
Třebestovice|Nymburk|28912|50.1247|14.9584
Třebeň|Cheb|35134|50.1287|12.4003
Třebešice|Benešov|25726|49.7753|14.8319
Třebešice|Kutná Hora|28601|49.9279|15.3379
Třebešov|Rychnov nad Kněžnou|51601|50.1684|16.2042
Třebichovice|Kladno|27306|50.1905|14.0791
Třebihošť|Trutnov|54401|50.4334|15.7098
Třebnouševes|Jičín|50801|50.3393|15.6518
Třeboc|Rakovník|27054|50.2144|13.7528
Třebohostice|Strakonice|38737|49.3326|13.8611
Třebom|Opava|74725|50.0462|18.0254
Třebonín|Kutná Hora|28544|49.8698|15.313
Třebosice|Pardubice|53002|49.9973|15.7349
Třebotov|Praha-západ|25226|49.9725|14.2913
Třebovice|Ústí nad Orlicí|56124|49.8594|16.5021
Třebovle|Kolín|28163|50.0273|14.9619
Třeboň|Jindřichův Hradec|37901|49.0036|14.7642
Třebsko|Příbram|26242|49.6258|13.9677
Třebusice|Kladno|27341|50.2009|14.1807
Třebušín|Litoměřice|41201|50.5997|14.2055
Třebívlice|Litoměřice|41115|50.4582|13.8994
Třebíz|Kladno|27375|50.2697|13.9909
Třebíč|Třebíč|67401|49.2149|15.8797
Třebčice|Plzeň-jih|33501|49.4835|13.6122
Třebějice|Tábor|39201|49.2445|14.8199
Třebětice|Jindřichův Hradec|38001|49.0477|15.5208
Třebětice|Kroměříž|76901|49.3195|17.5194
Třebětín|Kutná Hora|28522|49.7708|15.2695
Třemešná|Bruntál|79382|50.205|17.5754
Třemešné|Tachov|34806|49.6254|12.6958
Třemošnice|Chrudim|53843|49.8692|15.5801
Třemošná|Plzeň-sever|33011|49.8159|13.3951
Třesov|Třebíč|67502|49.1803|16.0829
Třesovice|Hradec Králové|50315|50.2652|15.689
Třešovice|Strakonice|38601|49.2114|13.9815
Třeštice|Jihlava|58856|49.2456|15.4533
Třeština|Šumperk|78973|49.7963|16.964
Třešť|Jihlava|58901|49.291|15.4834
Tři Dvory|Kolín|28002|50.0321|15.2566
Tři Sekery|Cheb|35301|49.9423|12.6167
Tři Studně|Žďár nad Sázavou|59204|49.6129|16.0366
Třibřichy|Chrudim|53701|49.9654|15.7393
Třinec|Frýdek-Místek|73961|49.6777|18.6709
Třtice|Rakovník|27101|50.1851|13.8636
Třtěnice|Jičín|50704|50.3775|15.4692
Ublo|Zlín|76312|49.2332|17.9012
Ubušínek|Žďár nad Sázavou|59265|49.6106|16.2818
Uhelná|Jeseník|79070|50.365|17.0274
Uhelná Příbram|Havlíčkův Brod|58245|49.7681|15.5857
Uhersko|Pardubice|53373|49.9925|16.0179
Uherské Hradiště|Uherské Hradiště|68601|49.0599|17.496
Uherský Brod|Uherské Hradiště|68801|49.0304|17.6499
Uherský Ostroh|Uherské Hradiště|68724|48.9857|17.39
Uherčice|Břeclav|69162|48.9679|16.6535
Uherčice|Znojmo|67107|48.9133|15.6305
Uhlířov|Opava|74784|49.8972|17.8414
Uhlířská Lhota|Kolín|28126|50.079|15.3912
Uhlířské Janovice|Kutná Hora|28504|49.8803|15.0649
Uhy|Kladno|27324|50.2843|14.274
Uhřice|Blansko|67963|49.5952|16.7351
Uhřice|Hodonín|69634|49.0504|16.9477
Uhřice|Vyškov|68333|49.1724|17.0788
Uhřice|Kroměříž|76833|49.2818|17.2015
Uhřičice|Přerov|75201|49.3717|17.2904
Uhřínov|Žďár nad Sázavou|59441|49.3499|15.9381
Ujkovice|Mladá Boleslav|29404|50.367|15.0995
Ujčov|Žďár nad Sázavou|59262|49.4885|16.3312
Unhošť|Kladno|27351|50.0855|14.1302
Uničov|Olomouc|78391|49.771|17.1215
Unkovice|Brno-venkov|66463|49.0193|16.6041
Unín|Brno-venkov|67924|49.3823|16.4915
Unčín|Žďár nad Sázavou|59242|49.6078|16.2458
Urbanice|Hradec Králové|50327|50.18|15.7275
Urbanice|Pardubice|53501|49.974|15.5671
Urbanov|Jihlava|58862|49.2145|15.5141
Určice|Prostějov|79804|49.4306|17.073
Uzenice|Strakonice|38801|49.4734|13.9599
Uzeničky|Strakonice|38801|49.489|13.9525
Vacenovice|Hodonín|69606|48.9452|17.1741
Vacov|Prachatice|38486|49.137|13.7292
Vacovice|Strakonice|38719|49.1405|13.781
Val|Tábor|39181|49.1462|14.7561
Val|Rychnov nad Kněžnou|51801|50.3113|16.1817
Valašská Bystřice|Vsetín|75627|49.4152|18.1099
Valašská Polanka|Vsetín|75611|49.2622|17.9968
Valašská Senice|Vsetín|75614|49.2254|18.1171
Valašské Klobouky|Zlín|76601|49.1397|18.0086
Valašské Meziříčí|Vsetín|75701|49.4719|17.9712
Valašské Příkazy|Vsetín|75612|49.166|18.0539
Valchov|Blansko|68001|49.4703|16.72
Valdice|Jičín|50711|50.4551|15.385
Valdíkov|Třebíč|67503|49.2471|15.9853
Valeč|Karlovy Vary|36453|50.1742|13.2547
Valeč|Třebíč|67553|49.1444|16.0358
Valkeřice|Děčín|40724|50.7019|14.322
Valtice|Břeclav|69142|48.7408|16.7551
Valtrovice|Znojmo|67128|48.7938|16.2211
Valy|Cheb|35301|49.9769|12.6549
Valy|Pardubice|53501|50.0297|15.6169
Valšov|Bruntál|79201|49.9335|17.4382
Vamberk|Rychnov nad Kněžnou|51754|50.1177|16.2908
Vanov|Jihlava|58856|49.2078|15.4137
Vanovice|Blansko|67936|49.5674|16.6663
Vanůvek|Jihlava|58856|49.2226|15.4227
Varnsdorf|Děčín|40747|50.9116|14.6183
Varvažov|Písek|39701|49.439|14.1427
Vatín|Žďár nad Sázavou|59101|49.525|15.9673
Vavřinec|Blansko|67913|49.4027|16.7199
Vavřinec|Kutná Hora|28504|49.9137|15.0333
Vchynice|Litoměřice|41002|50.5106|14.0202
Vedrovice|Znojmo|67175|49.021|16.3786
Vejprnice|Plzeň-sever|33027|49.73|13.2764
Vejprty|Chomutov|43191|50.4924|13.0322
Vejvanov|Rokycany|33828|49.8688|13.6525
Vejvanovice|Chrudim|53862|49.971|15.8802
Velatice|Brno-venkov|66405|49.1975|16.7537
Velehrad|Uherské Hradiště|68706|49.1055|17.3944
Velemyšleves|Louny|43801|50.4027|13.5638
Velemín|Litoměřice|41131|50.5391|13.9769
Velenice|Česká Lípa|47002|50.7191|14.664
Velenice|Nymburk|28901|50.2145|15.2265
Velenka|Nymburk|28912|50.1398|14.8957
Velenov|Blansko|68001|49.4869|16.7329
Veletiny|Uherské Hradiště|68733|49.0371|17.5625
Veletov|Kolín|28002|50.0284|15.305
Velečín|Plzeň-sever|33165|50.0744|13.4017
Veleň|Praha-východ|25063|50.1733|14.5543
Velešovice|Vyškov|68301|49.1793|16.8492
Velešín|Český Krumlov|38232|48.8296|14.4626
Velhartice|Klatovy|34142|49.2653|13.3899
Velichov|Karlovy Vary|36301|50.2842|13.0098
Velichovky|Náchod|55211|50.3569|15.8418
Veliká Ves|Praha-východ|25070|50.2437|14.4552
Veliká Ves|Chomutov|44101|50.2698|13.3747
Velim|Kolín|28101|50.0598|15.1072
Veliny|Pardubice|53401|50.0712|16.0538
Veliš|Jičín|50721|50.4076|15.3177
Veliš|Benešov|25706|49.6687|14.8232
Velká Bukovina|Děčín|40729|50.7305|14.3969
Velká Buková|Rakovník|27023|50.0347|13.8473
Velká Bystřice|Olomouc|78353|49.5943|17.3641
Velká Bíteš|Žďár nad Sázavou|59501|49.2887|16.226
Velká Chmelištná|Rakovník|27034|50.0637|13.5517
Velká Chyška|Pelhřimov|39428|49.5119|15.0374
Velká Dobrá|Kladno|27361|50.1097|14.0699
Velká Hleďsebe|Cheb|35301|49.9668|12.6668
Velká Jesenice|Náchod|55224|50.3612|16.0377
Velká Kraš|Jeseník|79058|50.3632|17.1465
Velká Lečice|Příbram|26205|49.8148|14.3236
Velká Lhota|Vsetín|75701|49.4379|18.0357
Velká Losenice|Žďár nad Sázavou|59211|49.5808|15.8368
Velká Polom|Ostrava-město|74764|49.8637|18.0934
Velká Skrovnice|Ústí nad Orlicí|56201|50.0305|16.317
Velká Turná|Strakonice|38601|49.3403|13.9588
Velká nad Veličkou|Hodonín|69674|48.8827|17.5207
Velká Štáhle|Bruntál|79351|49.9298|17.3571
Velké Albrechtice|Nový Jičín|74291|49.7505|18.044
Velké Bílovice|Břeclav|69102|48.8494|16.8924
Velké Březno|Ústí nad Labem|40323|50.6628|14.1419
Velké Chvojno|Ústí nad Labem|40334|50.7317|14.0368
Velké Hamry|Jablonec nad Nisou|46845|50.7138|15.3155
Velké Heraltice|Opava|74775|49.975|17.7289
Velké Hostěrádky|Břeclav|69174|49.0332|16.8703
Velké Hoštice|Opava|74731|49.9362|17.9739
Velké Hydčice|Klatovy|34101|49.2992|13.6681
Velké Janovice|Žďár nad Sázavou|59301|49.5879|16.2202
Velké Karlovice|Vsetín|75606|49.3607|18.2837
Velké Kunětice|Jeseník|79052|50.3167|17.266
Velké Losiny|Šumperk|78815|50.0321|17.0407
Velké Meziříčí|Žďár nad Sázavou|59401|49.3562|16.0132
Velké Němčice|Břeclav|69163|48.9918|16.6722
Velké Opatovice|Blansko|67963|49.6125|16.6796
Velké Pavlovice|Břeclav|69106|48.9048|16.8162
Velké Petrovice|Náchod|54954|50.5174|16.2066
Velké Popovice|Praha-východ|25169|49.9226|14.6395
Velké Poříčí|Náchod|54932|50.4619|16.1894
Velké Přílepy|Praha-západ|25264|50.1606|14.3146
Velké Přítočno|Kladno|27351|50.1166|14.1283
Velké Svatoňovice|Trutnov|54235|50.5317|16.0286
Velké Tresné|Žďár nad Sázavou|59265|49.5752|16.3806
Velké Všelisy|Mladá Boleslav|29427|50.3791|14.7452
Velké Žernoseky|Litoměřice|41201|50.5395|14.0639
Velký Beranov|Jihlava|58821|49.4051|15.6671
Velký Bor|Klatovy|34101|49.365|13.7015
Velký Borek|Mělník|27731|50.3454|14.5154
Velký Chlumec|Beroun|26724|49.8278|14.0871
Velký Karlov|Znojmo|67128|48.8046|16.3056
Velký Luh|Cheb|35134|50.1991|12.3723
Velký Malahov|Domažlice|34601|49.6237|12.9554
Velký Osek|Kolín|28151|50.0988|15.1864
Velký Ořechov|Zlín|76307|49.1095|17.6685
Velký Ratmírov|Jindřichův Hradec|37701|49.1777|14.9376
Velký Rybník|Pelhřimov|39301|49.4903|15.3081
Velký Týnec|Olomouc|78372|49.5521|17.3377
Velký Třebešov|Náchod|55202|50.393|16.0065
Velký Valtinov|Česká Lípa|47125|50.7436|14.7354
Velký Vřešťov|Trutnov|54454|50.3586|15.7517
Velký Újezd|Olomouc|78355|49.5787|17.4836
Velký Šenov|Děčín|40778|50.9909|14.3744
Veltruby|Kolín|28002|50.0707|15.1846
Veltrusy|Mělník|27746|50.2706|14.3287
Veltěže|Louny|44001|50.3533|13.8753
Velvary|Kladno|27324|50.2816|14.2363
Vendolí|Svitavy|56914|49.7399|16.4134
Vendryně|Frýdek-Místek|73994|49.6667|18.7132
Vepřová|Žďár nad Sázavou|59211|49.6125|15.8275
Vepříkov|Havlíčkův Brod|58301|49.7442|15.571
Verměřovice|Ústí nad Orlicí|56152|50.0056|16.5627
Verneřice|Děčín|40725|50.6612|14.3013
Vernéřovice|Náchod|54982|50.615|16.2211
Vernířovice|Šumperk|78815|50.0318|17.1301
Verušičky|Karlovy Vary|36452|50.1413|13.1739
Ves Touškov|Plzeň-jih|33301|49.6617|13.1193
Vesce|Tábor|39201|49.2498|14.677
Veselice|Mladá Boleslav|29404|50.3961|15.1272
Veselá|Pelhřimov|39470|49.3192|15.2268
Veselá|Semily|51252|50.5467|15.309
Veselá|Rokycany|33701|49.6952|13.6029
Veselá|Zlín|76315|49.2376|17.7756
Veselé|Děčín|40502|50.7848|14.3738
Veselí|Pardubice|53501|50.0112|15.6189
Veselí nad Lužnicí|Tábor|39181|49.1866|14.6993
Veselí nad Moravou|Hodonín|69801|48.9525|17.381
Veselíčko|Písek|39842|49.3881|14.3569
Veselíčko|Přerov|75125|49.5322|17.5092
Veselý Žďár|Havlíčkův Brod|58001|49.6397|15.5262
Vestec|Náchod|55205|50.4219|16.0214
Vestec|Nymburk|28933|50.2384|15.1461
Vestec|Praha-západ|25242|49.9806|14.505
Veverská Bítýška|Brno-venkov|66471|49.276|16.437
Veverské Knínice|Brno-venkov|66481|49.237|16.4019
Vevčice|Znojmo|67153|48.9623|16.0445
Veřovice|Nový Jičín|74273|49.5393|18.1144
Vidice|Domažlice|34601|49.6139|12.8356
Vidice|Kutná Hora|28401|49.9167|15.1656
Vidim|Mělník|27721|50.468|14.5259
Vidlatá Seč|Svitavy|57001|49.8361|16.2053
Vidnava|Jeseník|79055|50.3724|17.1864
Vidochov|Jičín|50901|50.5126|15.5659
Vidonín|Žďár nad Sázavou|59457|49.3798|16.2225
Vidov|České Budějovice|37007|48.9268|14.4947
Vidče|Vsetín|75653|49.4416|18.0948
Vigantice|Vsetín|75661|49.4439|18.1841
Vikantice|Šumperk|78825|50.1364|16.9931
Vikýřovice|Šumperk|78813|49.977|17.0136
Vilantice|Trutnov|54401|50.3659|15.7889
Vilice|Tábor|39143|49.5646|14.8644
Vilémov|Havlíčkův Brod|58283|49.8158|15.5359
Vilémov|Olomouc|78322|49.6356|16.9954
Vilémov|Děčín|40780|50.9906|14.3354
Vilémov|Chomutov|43154|50.3011|13.3122
Vilémovice|Blansko|67906|49.3639|16.7468
Vilémovice|Havlíčkův Brod|58401|49.6865|15.3219
Vimperk|Prachatice|38501|49.0526|13.7746
Vinary|Hradec Králové|50353|50.2896|15.429
Vinary|Ústí nad Orlicí|53863|49.9592|16.0604
Vinaře|Kutná Hora|28601|49.9092|15.5014
Vinařice|Beroun|26701|49.8926|14.0982
Vinařice|Kladno|27307|50.176|14.0912
Vinařice|Mladá Boleslav|29441|50.3739|14.9524
Vinařice|Louny|43915|50.2658|13.8229
Vincencov|Prostějov|79804|49.4058|17.0626
Vinec|Mladá Boleslav|29301|50.3947|14.8699
Viničné Šumice|Brno-venkov|66406|49.2137|16.8255
Vintířov|Sokolov|35735|50.2339|12.7176
Vitice|Kolín|28106|50.0311|14.9146
Vitiněves|Jičín|50601|50.3934|15.3783
Vitín|České Budějovice|37363|49.0896|14.546
Vitčice|Prostějov|79827|49.3119|17.241
Vitějovice|Prachatice|38427|49.0465|14.0735
Vizovice|Zlín|76312|49.2231|17.8549
Višňová|Jindřichův Hradec|37821|49.2191|14.8413
Višňová|Liberec|46401|50.9667|15.0251
Višňová|Příbram|26261|49.7059|14.1456
Višňové|Znojmo|67138|48.9825|16.1504
Vižina|Beroun|26724|49.8573|14.1047
Vlachova Lhota|Zlín|76601|49.15|17.9536
Vlachovice|Žďár nad Sázavou|59231|49.5971|16.0413
Vlachovice|Zlín|76324|49.1239|17.9401
Vlachovo Březí|Prachatice|38422|49.0815|13.9585
Vladislav|Třebíč|67501|49.2103|15.9884
Vlasatice|Brno-venkov|69130|48.9338|16.4845
Vlastec|Písek|39701|49.3657|14.2118
Vlastiboř|Tábor|39201|49.258|14.6368
Vlastiboř|Jablonec nad Nisou|46822|50.665|15.3118
Vlastibořice|Liberec|46344|50.6188|15.0521
Vlastislav|Litoměřice|41114|50.4971|13.9555
Vlastějovice|Kutná Hora|28523|49.7314|15.1749
Vlačice|Kutná Hora|28601|49.9431|15.4376
Vlašim|Benešov|25801|49.7064|14.8989
Vlkaneč|Kutná Hora|28564|49.8065|15.4032
Vlkanov|Havlíčkův Brod|58291|49.7157|15.3568
Vlkanov|Domažlice|34522|49.4886|12.8053
Vlkančice|Praha-východ|28163|49.902|14.8972
Vlkava|Mladá Boleslav|29443|50.2714|14.9614
Vlkov|České Budějovice|37341|49.1134|14.5223
Vlkov|Tábor|39181|49.1513|14.7253
Vlkov|Žďár nad Sázavou|59453|49.3245|16.2004
Vlkov|Náchod|55101|50.3127|15.8985
Vlkov pod Oškobrhem|Nymburk|28904|50.1561|15.2205
Vlkovice|Cheb|35301|49.9489|12.7391
Vlkoš|Hodonín|69641|48.9897|17.1637
Vlkoš|Přerov|75119|49.3959|17.4191
Vlksice|Písek|39901|49.481|14.4413
Vlčatín|Třebíč|67505|49.3059|15.949
Vlčetínec|Jindřichův Hradec|37842|49.2646|15.0546
Vlčeves|Tábor|39201|49.3571|14.9006
Vlčice|Trutnov|54101|50.5627|15.8217
Vlčice|Jeseník|79065|50.3454|17.0461
Vlčkov|Svitavy|56002|49.9077|16.3501
Vlčkovice v Podkrkonoší|Trutnov|54401|50.4111|15.9183
Vlčková|Zlín|76319|49.3106|17.7634
Vlčnov|Uherské Hradiště|68761|49.01|17.5819
Vlčtejn|Plzeň-jih|33204|49.6147|13.4958
Vlčí|Plzeň-jih|33401|49.512|13.3604
Vlčí Habřina|Pardubice|53341|50.0859|15.5961
Vnorovy|Hodonín|69661|48.9311|17.3506
Vochov|Plzeň-sever|33023|49.7571|13.2787
Vodice|Tábor|39153|49.4644|14.9091
Vodochody|Praha-východ|25069|50.2064|14.3989
Vodranty|Kutná Hora|28601|49.8905|15.3364
Vodslivy|Benešov|25724|49.8496|14.8373
Voděrady|Blansko|67901|49.4816|16.558
Voděrady|Rychnov nad Kněžnou|51734|50.2088|16.1532
Voděrady|Ústí nad Orlicí|56601|49.9497|16.2852
Vodňany|Strakonice|38901|49.148|14.1752
Vohančice|Brno-venkov|66601|49.3217|16.394
Vojkov|Benešov|25753|49.6523|14.5199
Vojkovice|Brno-venkov|66701|49.0515|16.6083
Vojkovice|Karlovy Vary|36273|50.3034|13.0163
Vojkovice|Frýdek-Místek|73951|49.6824|18.4681
Vojkovice|Mělník|27744|50.2963|14.3752
Vojníkov|Písek|39701|49.3538|14.1772
Vojnův Městec|Žďár nad Sázavou|59101|49.6796|15.8784
Vojslavice|Pelhřimov|39601|49.5932|15.2291
Vojtanov|Cheb|35134|50.1663|12.317
Vojtěchov|Chrudim|53901|49.7886|15.9736
Vokov|Pelhřimov|39301|49.3956|15.2199
Volanice|Jičín|50703|50.3356|15.3984
Volary|Prachatice|38451|48.9089|13.8867
Volduchy|Rokycany|33822|49.7762|13.6232
Volenice|Strakonice|38716|49.2525|13.748
Volenice|Příbram|26272|49.5479|13.8838
Volevčice|Jihlava|58856|49.2111|15.4447
Volevčice|Most|43401|50.435|13.6905
Voleč|Pardubice|53341|50.1174|15.5728
Volfartice|Česká Lípa|47112|50.7302|14.453
Volfířov|Jindřichův Hradec|38001|49.1069|15.3704
Volyně|Strakonice|38701|49.1659|13.8863
Volárna|Kolín|28002|50.0919|15.2406
Vonoklasy|Praha-západ|25228|49.9502|14.2768
Vortová|Chrudim|53961|49.7131|15.9363
Votice|Benešov|25901|49.6402|14.6382
Voznice|Příbram|26301|49.8173|14.2166
Vraclav|Ústí nad Orlicí|56542|49.9681|16.0901
Vracov|Hodonín|69642|48.9753|17.2111
Vracovice|Znojmo|67102|48.9022|15.8988
Vracovice|Benešov|25801|49.6626|14.9323
Vranov|Brno-venkov|66432|49.3094|16.6139
Vranov|Tachov|34901|49.7645|13.042
Vranov|Benešov|25722|49.8534|14.777
Vranov nad Dyjí|Znojmo|67103|48.8948|15.8128
Vranovice|Brno-venkov|69125|48.9661|16.6067
Vranovice|Příbram|26242|49.6227|13.8991
Vranovice-Kelčice|Prostějov|79808|49.401|17.1114
Vranovská Ves|Znojmo|67151|48.9516|15.9186
Vranová|Blansko|67962|49.5532|16.5251
Vranová Lhota|Svitavy|57101|49.7107|16.8254
Vrané nad Vltavou|Praha-západ|25246|49.9385|14.3834
Vraný|Kladno|27373|50.3272|14.0173
Vrančice|Příbram|26231|49.6107|14.0419
Vratimov|Ostrava-město|73932|49.77|18.3103
Vratislávka|Brno-venkov|59451|49.3865|16.2441
Vratěnín|Znojmo|67107|48.9042|15.5953
Vračovice-Orlov|Ústí nad Orlicí|56601|49.9525|16.2525
Vraňany|Mělník|27707|50.3173|14.3618
Vražkov|Litoměřice|41301|50.3735|14.2682
Vražné|Nový Jičín|74235|49.6288|17.8668
Vrbatův Kostelec|Chrudim|53956|49.8564|15.9411
Vrbice|Prachatice|38473|49.1414|13.7159
Vrbice|Břeclav|69109|48.9152|16.8979
Vrbice|Karlovy Vary|36453|50.1497|13.2338
Vrbice|Jičín|50703|50.3691|15.4289
Vrbice|Rychnov nad Kněžnou|51741|50.0892|16.2518
Vrbice|Nymburk|28904|50.181|15.2306
Vrbice|Litoměřice|41164|50.4833|14.2866
Vrbičany|Kladno|27374|50.3082|13.9959
Vrbičany|Litoměřice|41121|50.4627|14.0848
Vrbka|Kroměříž|76821|49.2283|17.4132
Vrbno nad Lesy|Louny|43906|50.3226|13.9071
Vrbno pod Pradědem|Bruntál|79326|50.121|17.3833
Vrbovec|Znojmo|67124|48.7999|16.1007
Vrbová Lhota|Nymburk|28911|50.1121|15.0628
Vrbátky|Prostějov|79813|49.5081|17.2001
Vrbčany|Kolín|28002|50.0503|14.9929
Vrchlabí|Trutnov|54301|50.6172|15.6051
Vrchoslavice|Prostějov|79827|49.3328|17.2193
Vrchotovy Janovice|Benešov|25753|49.6669|14.5779
Vrchovany|Česká Lípa|47201|50.5532|14.5712
Vrchovnice|Hradec Králové|50303|50.323|15.7576
Vrchy|Nový Jičín|74245|49.7511|17.8712
Vrcovice|Písek|39701|49.3448|14.1745
Vrdy|Kutná Hora|28571|49.9216|15.4725
Vrhaveč|Klatovy|33901|49.3456|13.2964
Vroutek|Louny|43982|50.1801|13.38
Vrskmaň|Chomutov|43115|50.4883|13.4957
Vrutice|Litoměřice|41147|50.5022|14.2899
Vrábče|České Budějovice|37001|48.9175|14.376
Vrátkov|Kolín|28201|50.0471|14.8349
Vrátno|Mladá Boleslav|29426|50.4327|14.6937
Vráto|České Budějovice|37001|48.9881|14.527
Vráž|Písek|39832|49.3831|14.128
Vráž|Beroun|26711|49.9834|14.129
Vrážné|Svitavy|56943|49.676|16.7781
Vrčeň|Plzeň-jih|33541|49.5081|13.619
Vršce|Jičín|50733|50.324|15.3232
Vršovice|Opava|74761|49.8849|17.9354
Vršovice|Louny|44001|50.3686|13.8421
Vršovka|Náchod|54901|50.3233|16.1203
Vsetín|Vsetín|75501|49.339|17.994
Vstiš|Plzeň-jih|33441|49.6456|13.2491
Vydří|Jindřichův Hradec|37802|49.0925|14.9457
Vyklantice|Pelhřimov|39427|49.5548|15.0406
Vykáň|Nymburk|28915|50.12|14.8168
Vyskeř|Semily|51264|50.5294|15.158
Vyskytná|Pelhřimov|39405|49.4283|15.3656
Vyskytná nad Jihlavou|Jihlava|58841|49.4195|15.5082
Vysokov|Náchod|54912|50.4039|16.1167
Vysoká|Havlíčkův Brod|58001|49.5624|15.6223
Vysoká|Bruntál|79399|50.2615|17.5903
Vysoká|Svitavy|56943|49.6637|16.8102
Vysoká|Mělník|27724|50.4127|14.5383
Vysoká Lhota|Pelhřimov|39501|49.4168|15.0424
Vysoká Libyně|Plzeň-sever|33141|50.022|13.4508
Vysoká Pec|Karlovy Vary|36221|50.3483|12.6967
Vysoká Pec|Chomutov|43159|50.5204|13.4704
Vysoká Srbská|Náchod|54931|50.4878|16.2277
Vysoká nad Labem|Hradec Králové|50331|50.1535|15.8248
Vysoká u Příbramě|Příbram|26242|49.6343|13.9485
Vysoké|Žďár nad Sázavou|59101|49.5819|15.9653
Vysoké Chvojno|Pardubice|53321|50.1091|15.9736
Vysoké Mýto|Ústí nad Orlicí|56601|49.9544|16.1643
Vysoké Pole|Zlín|76325|49.1775|17.9374
Vysoké Popovice|Brno-venkov|66484|49.1831|16.285
Vysoké Studnice|Jihlava|58821|49.3941|15.7302
Vysoké Veselí|Jičín|50703|50.3311|15.4364
Vysoké nad Jizerou|Semily|51211|50.6857|15.4016
Vysoký Chlumec|Příbram|26252|49.6178|14.3899
Vysoký Újezd|Hradec Králové|51771|50.2403|16.0202
Vysoký Újezd|Benešov|25744|49.8134|14.4764
Vysoký Újezd|Beroun|26716|49.9922|14.2063
Vysočany|Blansko|67913|49.432|16.8111
Vysočany|Znojmo|67107|48.9412|15.6898
Vysočina|Chrudim|53901|49.7648|15.8291
Vystrkov|Pelhřimov|39601|49.5198|15.3489
Vystrčenovice|Jihlava|58856|49.1512|15.5306
Vyšehněvice|Pardubice|53341|50.1024|15.5837
Vyšehořovice|Praha-východ|25087|50.1179|14.7738
Vyšehoří|Šumperk|78901|49.9337|16.8785
Vyškov|Vyškov|68201|49.2776|16.9962
Vyškovec|Uherské Hradiště|68774|48.9408|17.8534
Vyšní Lhoty|Frýdek-Místek|73951|49.6359|18.457
Vyšší Brod|Český Krumlov|38273|48.6161|14.3119
Vyžice|Chrudim|53803|49.9233|15.6212
Vyžlovka|Praha-východ|28163|49.9848|14.7892
Václavice|Benešov|25601|49.7894|14.6136
Václavov u Bruntálu|Bruntál|79201|49.9798|17.3718
Václavovice|Ostrava-město|73934|49.7554|18.3723
Václavy|Rakovník|27035|50.0638|13.5945
Vápenice|Uherské Hradiště|68774|48.968|17.8432
Vápenná|Jeseník|79064|50.2835|17.0977
Vápenný Podol|Chrudim|53803|49.8891|15.6669
Vápno|Pardubice|53316|50.1043|15.533
Vápovice|Jihlava|58856|49.1549|15.5808
Vážany|Blansko|68001|49.5313|16.6888
Vážany|Vyškov|68201|49.2445|17.0503
Vážany|Uherské Hradiště|68737|49.0346|17.312
Vážany nad Litavou|Vyškov|68401|49.1289|16.8572
Vémyslice|Znojmo|67142|49.0221|16.2569
Vícemil|Jindřichův Hradec|37821|49.264|14.8944
Víceměřice|Prostějov|79826|49.3442|17.1719
Vícenice|Třebíč|67602|49.0891|15.8122
Vícenice u Náměště nad Oslavou|Třebíč|67571|49.2027|16.1261
Víchová nad Jizerou|Semily|51241|50.6302|15.4878
Vícov|Prostějov|79803|49.4886|16.9597
Vídeň|Žďár nad Sázavou|59401|49.3922|16.0317
Vílanec|Jihlava|58835|49.3346|15.5769
Vír|Žďár nad Sázavou|59266|49.5575|16.3237
Víska|Havlíčkův Brod|58301|49.7704|15.6527
Víska u Jevíčka|Svitavy|56943|49.6526|16.7078
Vísky|Blansko|67933|49.5385|16.6257
Vísky|Rokycany|33843|49.6513|13.6827
Vítanov|Chrudim|53901|49.7492|15.8818
Vítkov|Opava|74901|49.7745|17.7495
Vítkovice|Semily|51238|50.6791|15.5313
Vítonice|Znojmo|67161|48.9195|16.199
Vítonice|Kroměříž|76861|49.4472|17.6931
Vítějeves|Svitavy|56906|49.6158|16.4655
Vítězná|Trutnov|54462|50.489|15.8023
Výkleky|Přerov|75125|49.555|17.4757
Výprachtice|Ústí nad Orlicí|56134|49.9873|16.6639
Výrava|Hradec Králové|50303|50.2697|15.9791
Výrov|Plzeň-sever|33141|49.9619|13.4627
Výrovice|Znojmo|67134|48.9284|16.1204
Výsluní|Chomutov|43183|50.4666|13.2375
Výčapy|Třebíč|67401|49.1436|15.8776
Výškov|Louny|44001|50.395|13.6704
Výšovice|Prostějov|79809|49.4164|17.1391
Výžerky|Praha-východ|28163|49.9452|14.8835
Včelnička|Pelhřimov|39470|49.3045|15.0425
Včelná|České Budějovice|37382|48.9238|14.4539
Včelákov|Chrudim|53957|49.8178|15.8845
Věchnov|Žďár nad Sázavou|59301|49.4995|16.2791
Věcov|Žďár nad Sázavou|59244|49.6162|16.17
Vědomice|Litoměřice|41301|50.434|14.254
Vělopolí|Frýdek-Místek|73959|49.7005|18.571
Věrovany|Olomouc|78375|49.4612|17.2881
Věstín|Žďár nad Sázavou|59265|49.567|16.34
Věteřov|Hodonín|69701|49.0286|17.0562
Větrný Jeníkov|Jihlava|58842|49.4759|15.479
Větrušice|Praha-východ|25067|50.1909|14.3835
Větřkovice|Opava|74743|49.7806|17.8206
Větřní|Český Krumlov|38211|48.7744|14.2863
Věšín|Příbram|26243|49.6154|13.8243
Věž|Havlíčkův Brod|58256|49.564|15.4592
Věžky|Přerov|75119|49.4051|17.4233
Věžky|Kroměříž|76833|49.2852|17.2815
Věžnice|Havlíčkův Brod|58252|49.5145|15.6958
Věžnice|Jihlava|58827|49.4801|15.6954
Věžnička|Jihlava|58813|49.4604|15.7056
Věžná|Pelhřimov|39501|49.4143|14.9888
Věžná|Žďár nad Sázavou|59301|49.4608|16.2713
Věžovatá Pláně|Český Krumlov|38232|48.7763|14.4092
Vřesina|Opava|74720|49.9456|18.1906
Vřesina|Ostrava-město|74285|49.8243|18.1258
Vřeskovice|Klatovy|33401|49.5255|13.2712
Vřesník|Jičín|50771|50.4381|15.6283
Vřesovice|Hodonín|69648|49.0592|17.2151
Vřesovice|Prostějov|79809|49.4018|17.139
Vřesová|Sokolov|35735|50.2592|12.6966
Všechlapy|Benešov|25726|49.7791|14.9143
Všechlapy|Nymburk|28802|50.2212|15.0285
Všechovice|Brno-venkov|66603|49.3572|16.4942
Všechovice|Přerov|75353|49.4629|17.7582
Všehrdy|Plzeň-sever|33141|49.9638|13.5852
Všehrdy|Chomutov|43001|50.42|13.4613
Všejany|Mladá Boleslav|29443|50.2549|14.9536
Všekary|Domažlice|34562|49.6035|13.0426
Všelibice|Liberec|46348|50.6461|14.9515
Všemina|Zlín|76315|49.2811|17.8769
Všemyslice|České Budějovice|37501|49.2171|14.358
Všenice|Rokycany|33824|49.818|13.5608
Všenory|Praha-západ|25231|49.9289|14.304
Všepadly|Domažlice|34543|49.451|13.1054
Všeradice|Beroun|26726|49.8738|14.1049
Všeradov|Chrudim|53901|49.7478|15.8373
Všeruby|Domažlice|34507|49.3408|12.9833
Všeruby|Plzeň-sever|33016|49.8418|13.2295
Všestary|Hradec Králové|50312|50.2554|15.7602
Všestary|Praha-východ|25163|49.9587|14.6854
Všestudy|Mělník|27746|50.2909|14.3427
Všestudy|Chomutov|43111|50.4575|13.5077
Všesulov|Rakovník|27034|50.0398|13.611
Všetaty|Mělník|27716|50.282|14.5931
Všetaty|Rakovník|27021|50.0462|13.7578
Vševily|Příbram|26272|49.5653|13.8826
Všeň|Semily|51265|50.5576|15.1053
Xaverov|Benešov|28506|49.8428|14.8845
ZLÍN|Zlín|76001|49.2245|17.6629
Zabrušany|Teplice|41771|50.6051|13.7876
Zachotín|Pelhřimov|39301|49.4624|15.348
Zachrašťany|Hradec Králové|50401|50.2112|15.4831
Zadní Chodov|Tachov|34815|49.8906|12.6547
Zadní Střítež|Tábor|39143|49.4942|14.9168
Zadní Třebaň|Beroun|26729|49.9181|14.2082
Zadní Vydří|Jihlava|58856|49.1344|15.4172
Zadní Zhořec|Žďár nad Sázavou|59444|49.4312|15.9393
Zahnašovice|Kroměříž|76901|49.3047|17.5602
Zahorčice|Strakonice|38719|49.2088|13.8176
Zahořany|Domažlice|34401|49.4342|13.002
Zahořany|Praha-západ|25210|49.8494|14.2954
Zahrádka|Třebíč|67571|49.2445|16.0984
Zahrádka|Plzeň-sever|33035|49.8809|13.2117
Zahrádky|Jindřichův Hradec|37853|49.2009|15.2419
Zahrádky|Česká Lípa|47101|50.6342|14.5247
Zahájí|České Budějovice|37348|49.0897|14.3709
Zaječice|Chrudim|53835|49.9101|15.8842
Zaječov|Beroun|26763|49.7745|13.8408
Zaječí|Břeclav|69105|48.873|16.7666
Zajíčkov|Pelhřimov|39301|49.3781|15.2581
Zakřany|Brno-venkov|66484|49.1706|16.3254
Zalešany|Kolín|28002|50.0358|15.0079
Zaloňov|Náchod|55101|50.3741|15.888
Zalužany|Příbram|26284|49.5424|14.0858
Zastávka|Brno-venkov|66484|49.1881|16.3632
Zavidov|Rakovník|27035|50.0568|13.6204
Zavlekov|Klatovy|34142|49.3375|13.4905
Zašovice|Třebíč|67521|49.2583|15.7258
Zašová|Vsetín|75651|49.4742|18.0445
Zbelítov|Písek|39901|49.4567|14.3292
Zbenice|Příbram|26231|49.5923|14.0892
Zbečno|Rakovník|27024|50.0419|13.9205
Zbilidy|Jihlava|58842|49.4438|15.4228
Zbinohy|Jihlava|58842|49.4874|15.4805
Zbiroh|Rokycany|33808|49.8603|13.7727
Zbizuby|Kutná Hora|28504|49.8311|15.0477
Zblovice|Znojmo|67107|48.9578|15.7053
Zborov|Šumperk|78901|49.9438|16.836
Zborovice|Kroměříž|76832|49.249|17.2848
Zborovy|Klatovy|34034|49.3812|13.5158
Zbožíčko|Nymburk|28925|50.2258|14.9399
Zbraslav|Brno-venkov|66484|49.2217|16.2943
Zbraslavec|Blansko|67972|49.484|16.5285
Zbraslavice|Kutná Hora|28521|49.8119|15.1833
Zbrašín|Louny|44001|50.2994|13.766
Zbuzany|Praha-západ|25225|50.0243|14.2869
Zbyslavice|Ostrava-město|74283|49.8054|18.0756
Zbytiny|Prachatice|38441|48.9427|13.9782
Zbýšov|Brno-venkov|66411|49.1553|16.3496
Zbýšov|Vyškov|68352|49.1314|16.8058
Zbýšov|Kutná Hora|28565|49.8117|15.3532
Zběšičky|Písek|39843|49.3926|14.4266
Zbůch|Plzeň-sever|33022|49.6785|13.2258
Zdechovice|Hradec Králové|50401|50.2248|15.5618
Zdechovice|Pardubice|53311|50.013|15.4696
Zdelov|Rychnov nad Kněžnou|51721|50.1008|16.1423
Zdemyslice|Plzeň-jih|33601|49.6071|13.5199
Zderaz|Chrudim|53944|49.8286|16.1002
Zdeňkov|Jihlava|58856|49.14|15.6201
Zdiby|Praha-východ|25066|50.1681|14.4513
Zdice|Beroun|26751|49.9122|13.9776
Zdislava|Liberec|46353|50.7651|14.8764
Zdislavice|Benešov|25764|49.6866|14.9746
Zdobnice|Rychnov nad Kněžnou|51601|50.2386|16.4087
Zdobín|Trutnov|54401|50.4154|15.7047
Zdounky|Kroměříž|76802|49.2278|17.3191
Zduchovice|Příbram|26263|49.6387|14.209
Zdíkov|Prachatice|38472|49.0847|13.6975
Zděchov|Vsetín|75607|49.2611|18.0779
Zdětín|Prostějov|79843|49.5059|16.9889
Zdětín|Mladá Boleslav|29471|50.3127|14.8125
Zelenecká Lhota|Jičín|50723|50.4017|15.1789
Zeleneč|Praha-východ|25091|50.1337|14.6608
Zelená Hora|Vyškov|68321|49.3291|17.0138
Zemětice|Plzeň-jih|33452|49.5785|13.1864
Zhoř|Písek|39901|49.5013|14.3828
Zhoř|Brno-venkov|67923|49.4148|16.479
Zhoř|Jihlava|58826|49.4427|15.7714
Zhoř|Tachov|34901|49.66|12.9698
Zhoř u Mladé Vožice|Tábor|39143|49.5436|14.765
Zhoř u Tábora|Tábor|39002|49.3576|14.6576
Zhořec|Pelhřimov|39501|49.4897|14.9626
Zichovec|Kladno|27374|50.2712|13.9261
Zlatníky-Hodkovice|Praha-západ|25241|49.9606|14.4808
Zlatá|Praha-východ|25083|50.0403|14.7101
Zlatá Koruna|Český Krumlov|38202|48.8549|14.3696
Zlatá Olešnice|Trutnov|54101|50.6178|15.9449
Zlatá Olešnice|Jablonec nad Nisou|46847|50.7086|15.3536
Zlaté Hory|Jeseník|79376|50.2639|17.3961
Zlechov|Uherské Hradiště|68710|49.0741|17.3795
Zliv|České Budějovice|37344|49.0662|14.3662
Zlobice|Kroměříž|76831|49.3019|17.3127
Zlonice|Kladno|27371|50.2876|14.0922
Zlonín|Praha-východ|25064|50.2158|14.5079
Zlončice|Mělník|27801|50.2289|14.3577
Zlosyň|Mělník|27744|50.278|14.3687
Zlukov|Tábor|39181|49.193|14.7452
Zlámanec|Uherské Hradiště|68712|49.13|17.6283
Zlátenka|Pelhřimov|39501|49.4236|15.0587
Znojmo|Znojmo|66902|48.856|16.0544
Znětínek|Žďár nad Sázavou|59444|49.4697|15.9266
Zruč nad Sázavou|Kutná Hora|28522|49.7402|15.1062
Zruč-Senec|Plzeň-sever|33008|49.8031|13.4191
Zubrnice|Ústí nad Labem|40002|50.6496|14.2205
Zubčice|Český Krumlov|38232|48.7941|14.4073
Zubří|Žďár nad Sázavou|59231|49.5712|16.1238
Zubří|Vsetín|75654|49.4661|18.0926
Zvole|Žďár nad Sázavou|59256|49.4945|16.1749
Zvole|Šumperk|78901|49.8399|16.9144
Zvole|Praha-západ|25245|49.9348|14.4178
Zvolenovice|Jihlava|58856|49.1634|15.5057
Zvoleněves|Kladno|27325|50.2313|14.1823
Zvotoky|Strakonice|38716|49.2125|13.7578
Zvánovice|Praha-východ|25165|49.932|14.7803
Zvíkov|České Budějovice|37372|48.9809|14.617
Zvíkov|Český Krumlov|38232|48.8026|14.4489
Zvíkovec|Rokycany|33808|49.9542|13.6886
Zvíkovské Podhradí|Písek|39701|49.4267|14.2007
Zvěrkovice|Třebíč|67602|49.0256|15.8633
Zvěrotice|Tábor|39201|49.2721|14.7448
Zvěstov|Benešov|25706|49.6328|14.7922
Zvěstovice|Havlíčkův Brod|58282|49.848|15.5127
Zvěřínek|Nymburk|28913|50.1533|15.0058
Zábeštní Lhota|Přerov|75127|49.512|17.4312
Záblatí|Jindřichův Hradec|37901|49.1073|14.6863
Záblatí|Prachatice|38433|48.9987|13.9314
Záblatí|Žďár nad Sázavou|59453|49.3208|16.1664
Záborná|Jihlava|58813|49.4868|15.7569
Záboří|České Budějovice|37384|48.9901|14.2673
Záboří|Strakonice|38734|49.3789|13.8271
Záboří nad Labem|Kutná Hora|28574|50.0253|15.35
Zábrdí|Prachatice|38301|49.0281|13.9395
Zábrodí|Náchod|54941|50.4597|16.1125
Zábřeh|Šumperk|78901|49.8827|16.8723
Zábřezí-Řečice|Trutnov|54401|50.4114|15.7356
Záchlumí|Ústí nad Orlicí|56186|50.0954|16.3763
Záchlumí|Tachov|34901|49.8002|12.965
Zádolí|Ústí nad Orlicí|56601|49.9032|16.1272
Zádub-Závišín|Cheb|35301|49.9719|12.7441
Zádveřice-Raková|Zlín|76312|49.2166|17.8056
Záhornice|Nymburk|28903|50.2477|15.291
Záhorovice|Uherské Hradiště|68771|49.0228|17.7793
Záhoří|Jindřichův Hradec|37821|49.213|14.7985
Záhoří|Písek|39818|49.3438|14.2126
Záhoří|Tábor|39165|49.2397|14.5136
Záhoří|Semily|51301|50.6116|15.2742
Zájezd|Kladno|27343|50.1661|14.2206
Zájezdec|Chrudim|53851|49.9318|15.9269
Zákolany|Kladno|27328|50.1965|14.2479
Zákupy|Česká Lípa|47123|50.6849|14.6453
Zálesná Zhoř|Brno-venkov|66484|49.2503|16.2899
Zálesí|Znojmo|67102|48.9542|15.7822
Zálezlice|Mělník|27745|50.3076|14.4383
Zálezly|Prachatice|38481|49.1076|13.8947
Zálužice|Louny|43801|50.3213|13.6043
Záluží|Beroun|26761|49.8428|13.8606
Záluží|Litoměřice|41301|50.4602|14.3226
Zálší|Tábor|39181|49.218|14.5993
Zálší|Ústí nad Orlicí|56501|49.9654|16.2408
Zámostí-Blata|Jičín|50601|50.4709|15.2641
Zámrsk|Ústí nad Orlicí|56543|49.9863|16.1288
Zámrsky|Přerov|75301|49.5065|17.8279
Záměl|Rychnov nad Kněžnou|51743|50.0966|16.2989
Zápy|Praha-východ|25001|50.1651|14.6802
Zárubice|Třebíč|67552|49.1243|15.9815
Záryby|Praha-východ|27713|50.2207|14.626
Zásada|Jablonec nad Nisou|46825|50.6978|15.27
Zásmuky|Kolín|28144|49.9548|15.0307
Zástřizly|Kroměříž|76805|49.1499|17.2352
Zátor|Bruntál|79316|50.0342|17.5931
Závada|Opava|74719|49.9541|18.1658
Závist|Blansko|67922|49.3753|16.5722
Závišice|Nový Jičín|74221|49.6134|18.1031
Závraty|České Budějovice|37001|48.9382|14.3816
Zářecká Lhota|Ústí nad Orlicí|56501|49.9932|16.2462
Záříčí|Kroměříž|76811|49.3827|17.3529
ÚSTÍ NAD LABEM|Ústí nad Labem|40001|50.6612|14.0532
Úbislavice|Jičín|50792|50.473|15.4704
Úboč|Domažlice|34543|49.4437|13.087
Údlice|Chomutov|43141|50.4407|13.4575
Údrnice|Jičín|50723|50.3745|15.2617
Úherce|Plzeň-sever|33023|49.7015|13.2138
Úherce|Louny|44001|50.2982|13.9491
Úherčice|Chrudim|53803|49.9196|15.6777
Úhlejov|Jičín|50771|50.4273|15.6874
Úholičky|Praha-západ|25264|50.1615|14.3353
Úhonice|Praha-západ|25218|50.0434|14.1863
Úhořilka|Havlíčkův Brod|58253|49.5248|15.531
Úhřetice|Chrudim|53832|49.9793|15.8673
Úhřetická Lhota|Pardubice|53002|49.9887|15.8729
Újezd|Znojmo|67140|49.0236|16.0534
Újezd|Žďár nad Sázavou|59212|49.5093|15.8703
Újezd|Olomouc|78396|49.7641|17.1805
Újezd|Domažlice|34401|49.4356|12.8697
Újezd|Beroun|26761|49.8314|13.8376
Újezd|Zlín|76325|49.1682|17.9062
Újezd nade Mží|Plzeň-sever|33033|49.7889|13.1952
Újezd pod Troskami|Jičín|51263|50.5066|15.2627
Újezd u Boskovic|Blansko|68001|49.464|16.6543
Újezd u Brna|Brno-venkov|66453|49.1044|16.7575
Újezd u Chocně|Ústí nad Orlicí|56501|50.027|16.1647
Újezd u Plánice|Klatovy|33901|49.4176|13.4578
Újezd u Přelouče|Pardubice|53316|50.102|15.4946
Újezd u Rosic|Brno-venkov|66484|49.2225|16.2537
Újezd u Sezemic|Pardubice|53304|50.1141|15.8558
Újezd u Svatého Kříže|Rokycany|33824|49.8598|13.5696
Újezd u Tišnova|Brno-venkov|59455|49.3656|16.3246
Újezd u Černé Hory|Blansko|67922|49.371|16.5439
Újezdec|Jindřichův Hradec|37821|49.2076|14.7848
Újezdec|Prachatice|38422|49.108|13.9641
Újezdec|Svitavy|57001|49.8779|16.206
Újezdec|Mělník|27745|50.2835|14.421
Újezdec|Uherské Hradiště|68741|49.0362|17.2721
Újezdeček|Teplice|41501|50.6458|13.7899
Úlehle|Strakonice|38719|49.2016|13.8385
Úlibice|Jičín|50707|50.4341|15.4374
Úlice|Plzeň-sever|33033|49.7609|13.1483
Úmonín|Kutná Hora|28546|49.8888|15.2715
Úmyslovice|Nymburk|29001|50.2035|15.1777
Únanov|Znojmo|67131|48.9009|16.0636
Únehle|Tachov|34901|49.7917|13.0155
Únice|Strakonice|38601|49.3123|13.8685
Únějovice|Domažlice|34543|49.4621|13.1187
Únětice|Plzeň-jih|33601|49.5844|13.4701
Únětice|Praha-západ|25262|50.1502|14.3542
Úněšov|Plzeň-sever|33038|49.8827|13.1493
Úpice|Trutnov|54232|50.5125|16.0162
Úpohlavy|Litoměřice|41002|50.4632|14.0356
Úsilné|České Budějovice|37010|49.0135|14.5074
Úsilov|Domažlice|34506|49.397|13.1271
Úsobrno|Blansko|67939|49.589|16.763
Úsobí|Havlíčkův Brod|58254|49.5143|15.5026
Úsov|Šumperk|78973|49.7984|17.0107
Ústrašice|Tábor|39002|49.3404|14.6846
Ústrašín|Pelhřimov|39301|49.3826|15.1687
Ústup|Blansko|67974|49.565|16.463
Ústí|Jihlava|58842|49.4736|15.4149
Ústí|Přerov|75301|49.5169|17.7665
Ústí|Vsetín|75501|49.3083|18.0032
Ústí nad Orlicí|Ústí nad Orlicí|56201|49.9723|16.3998
Ústín|Olomouc|78346|49.5871|17.1577
Úsuší|Brno-venkov|66601|49.3348|16.3561
Úterý|Plzeň-sever|33041|49.9402|13.0043
Útušice|Plzeň-jih|33209|49.6779|13.3821
Útvina|Karlovy Vary|36401|50.0708|12.9549
Útěchov|Svitavy|57101|49.7285|16.6447
Útěchovice|Pelhřimov|39501|49.4782|15.1165
Útěchovice pod Stražištěm|Pelhřimov|39501|49.5386|15.0292
Útěchovičky|Pelhřimov|39501|49.4607|15.0998
Úvalno|Bruntál|79391|50.0473|17.7448
Úvaly|Praha-východ|25082|50.0738|14.7309
Úštěk|Litoměřice|41145|50.5858|14.3477
Úžice|Kutná Hora|28504|49.8721|14.9728
Úžice|Mělník|27745|50.253|14.379
ČESKÉ BUDĚJOVICE|České Budějovice|37001|48.9758|14.4804
Čachotín|Havlíčkův Brod|58301|49.6953|15.6087
Čachovice|Mladá Boleslav|29443|50.2756|14.946
Čachrov|Klatovy|33901|49.2655|13.3027
Čakov|České Budějovice|37384|48.9807|14.3078
Čakov|Benešov|25724|49.8257|14.8364
Čakovičky|Mělník|25063|50.2317|14.5315
Čaková|Bruntál|79316|50.0511|17.5485
Čankovice|Chrudim|53862|49.9638|15.9374
Častohostice|Třebíč|67602|49.0145|15.8193
Častolovice|Rychnov nad Kněžnou|51750|50.1292|16.1814
Častrov|Pelhřimov|39463|49.3079|15.1804
Časy|Pardubice|53401|50.0695|15.8982
Čavisov|Ostrava-město|74764|49.8296|18.0808
Čebín|Brno-venkov|66423|49.3133|16.478
Čechočovice|Třebíč|67522|49.203|15.7937
Čechtice|Benešov|25765|49.6241|15.0483
Čechtín|Třebíč|67507|49.2931|15.82
Čechy|Přerov|75115|49.4292|17.5344
Čechy pod Kosířem|Prostějov|79858|49.5511|17.0378
Čehovice|Prostějov|79821|49.4325|17.1752
Čejetice|Strakonice|38601|49.2529|14.0205
Čejkovice|České Budějovice|37341|49.0144|14.383
Čejkovice|Hodonín|69615|48.906|16.9424
Čejkovice|Znojmo|67178|48.8778|16.2874
Čejkovice|Kutná Hora|28601|49.7919|15.3498
Čejov|Pelhřimov|39601|49.5658|15.3794
Čejč|Hodonín|69614|48.9466|16.9652
Čeladná|Frýdek-Místek|73912|49.5488|18.3377
Čelechovice|Přerov|75103|49.5101|17.3722
Čelechovice na Hané|Prostějov|79816|49.5164|17.0939
Čelistná|Pelhřimov|39301|49.3603|15.2064
Čeložnice|Hodonín|69651|49.052|17.1548
Čelákovice|Praha-východ|25088|50.1628|14.7511
Čelčice|Prostějov|79823|49.4124|17.1937
Čeminy|Plzeň-sever|33033|49.8001|13.2532
Čenkov|Příbram|26223|49.7778|14.0009
Čenkov u Bechyně|České Budějovice|39165|49.2335|14.5009
Čenkovice|Ústí nad Orlicí|56164|50.0115|16.6825
Čeperka|Pardubice|53345|50.1331|15.7733
Čepí|Pardubice|53332|49.9852|15.7177
Čepřovice|Strakonice|38756|49.1553|13.9752
Čeradice|Louny|43801|50.3089|13.494
Čermná|Trutnov|54377|50.5501|15.7697
Čermná|Domažlice|34561|49.5317|13.1167
Čermná nad Orlicí|Rychnov nad Kněžnou|51725|50.0804|16.1441
Čermná ve Slezsku|Opava|74901|49.7824|17.7022
Čermákovice|Znojmo|67173|49.0322|16.1951
Černava|Karlovy Vary|36221|50.2914|12.7111
Černilov|Hradec Králové|50343|50.2627|15.9226
Černiv|Litoměřice|41002|50.445|14.059
Černolice|Praha-západ|25210|49.9098|14.2994
Černotín|Přerov|75368|49.532|17.7722
Černousy|Liberec|46373|51.0046|15.0506
Černouček|Litoměřice|41301|50.3609|14.3074
Černov|Pelhřimov|39301|49.3441|15.3141
Černovice|Blansko|67975|49.4836|16.423
Černovice|Pelhřimov|39494|49.3728|14.961
Černovice|Domažlice|34562|49.6157|12.997
Černovice|Chomutov|43001|50.4478|13.3594
Černošice|Praha-západ|25228|49.9602|14.3199
Černošín|Tachov|34958|49.8162|12.8839
Černožice|Hradec Králové|50304|50.3187|15.8741
Černuc|Kladno|27323|50.3012|14.2026
Černvír|Brno-venkov|59262|49.4454|16.3463
Černá|Žďár nad Sázavou|59442|49.4262|15.8639
Černá Hora|Blansko|67921|49.4137|16.5815
Černá Voda|Jeseník|79054|50.3083|17.1471
Černá u Bohdanče|Pardubice|53341|50.0561|15.6719
Černá v Pošumaví|Český Krumlov|38223|48.7381|14.1106
Černé Voděrady|Praha-východ|28163|49.9417|14.8069
Černíkov|Klatovy|34506|49.4228|13.1301
Černíkovice|Rychnov nad Kněžnou|51704|50.1867|16.2071
Černíkovice|Plzeň-sever|33141|49.9756|13.567
Černíky|Nymburk|28915|50.1021|14.8201
Černín|Znojmo|67153|48.9831|16.021
Černíny|Kutná Hora|28401|49.8401|15.2189
Černíč|Jihlava|58856|49.128|15.4594
Černý Důl|Trutnov|54344|50.6351|15.7107
Černýšovice|Tábor|39165|49.3252|14.5205
Černčice|Náchod|54901|50.3358|16.1027
Černčice|Louny|43901|50.3615|13.8453
Černěves|Litoměřice|41301|50.4545|14.2432
Červenka|Olomouc|78401|49.7189|17.0838
Červená Hora|Náchod|54941|50.4502|16.0589
Červená Lhota|Třebíč|67507|49.2846|15.8062
Červená Třemešná|Jičín|50801|50.3994|15.6436
Červená Voda|Ústí nad Orlicí|56161|50.0404|16.7428
Červená Řečice|Pelhřimov|39446|49.5113|15.1785
Červené Janovice|Kutná Hora|28542|49.8347|15.2534
Červené Pečky|Kolín|28121|49.9783|15.2087
Červené Poříčí|Klatovy|34012|49.502|13.2946
Červený Hrádek|Jindřichův Hradec|38001|49.123|15.539
Červený Kostelec|Náchod|54941|50.4764|16.093
Červený Újezd|Benešov|25788|49.5555|14.6042
Červený Újezd|Praha-západ|27351|50.0698|14.166
Čerčany|Benešov|25722|49.853|14.7031
Čerňovice|Plzeň-sever|33036|49.813|13.1038
Česká|Brno-venkov|66431|49.2802|16.5655
Česká Bělá|Havlíčkův Brod|58261|49.643|15.6911
Česká Bříza|Plzeň-sever|33011|49.8285|13.4298
Česká Kamenice|Děčín|40721|50.7979|14.4178
Česká Kubice|Domažlice|34532|49.3695|12.8589
Česká Lípa|Česká Lípa|47001|50.6786|14.5398
Česká Metuje|Náchod|54956|50.5457|16.1803
Česká Rybná|Ústí nad Orlicí|56185|50.0719|16.3923
Česká Skalice|Náchod|55203|50.3948|16.0429
Česká Třebová|Ústí nad Orlicí|56002|49.902|16.4474
Česká Ves|Jeseník|79081|50.2575|17.2282
Česká Čermná|Náchod|54921|50.4008|16.2295
České Heřmanice|Ústí nad Orlicí|56552|49.9315|16.2532
České Lhotice|Chrudim|53825|49.847|15.7779
České Libchavy|Ústí nad Orlicí|56114|50.0299|16.3718
České Meziříčí|Rychnov nad Kněžnou|51771|50.2869|16.0444
České Petrovice|Ústí nad Orlicí|56401|50.1194|16.6055
České Velenice|Jindřichův Hradec|37810|48.7686|14.9638
Český Brod|Kolín|28201|50.0743|14.8609
Český Dub|Liberec|46343|50.6611|14.9963
Český Jiřetín|Most|43601|50.7076|13.5475
Český Krumlov|Český Krumlov|38101|48.8128|14.3176
Český Rudolec|Jindřichův Hradec|37883|49.0685|15.3245
Český Těšín|Karviná|73701|49.7471|18.6239
Český Šternberk|Benešov|25726|49.811|14.9283
Čestice|Strakonice|38719|49.1679|13.8038
Čestice|Rychnov nad Kněžnou|51741|50.1279|16.1458
Čestlice|Praha-východ|25101|50.0026|14.5837
Čestín|Kutná Hora|28510|49.8077|15.1045
Čečelice|Mělník|27732|50.2941|14.6187
Čečelovice|Strakonice|38801|49.3741|13.795
Čečkovice|Havlíčkův Brod|58301|49.7847|15.6641
Čečovice|Domažlice|34562|49.5852|13.0218
Češov|Jičín|50601|50.3392|15.3604
Čichalov|Karlovy Vary|36452|50.1244|13.1712
Čikov|Třebíč|67578|49.2696|16.141
Čilec|Nymburk|28925|50.2195|14.9818
Čilá|Rokycany|33808|49.9618|13.7422
Čimelice|Písek|39804|49.4657|14.0693
Činěves|Nymburk|28901|50.2301|15.214
Čisovice|Praha-západ|25204|49.8635|14.3149
Čistá|Svitavy|56956|49.8273|16.3288
Čistá|Mladá Boleslav|29423|50.4721|14.8436
Čistá|Rakovník|27034|50.099|13.7337
Čistá u Horek|Semily|51235|50.5317|15.6076
Čistěves|Hradec Králové|50315|50.2889|15.7319
Čižice|Plzeň-jih|33209|49.648|13.398
Čkyně|Prachatice|38481|49.1151|13.8292
Člunek|Jindřichův Hradec|37861|49.1115|15.1269
Čmelíny|Plzeň-jih|33501|49.4889|13.6546
Čtveřín|Liberec|46345|50.5926|15.1003
Čtyřkoly|Benešov|25722|49.8686|14.7197
Čučice|Brno-venkov|66491|49.1372|16.2787
Čáslav|Kutná Hora|28601|49.911|15.3909
Čáslavice|Třebíč|67524|49.1523|15.7725
Čáslavsko|Pelhřimov|39501|49.5925|15.0029
Částkov|Tachov|34801|49.7561|12.6738
Částkov|Uherské Hradiště|68712|49.1045|17.6199
Číchov|Třebíč|67521|49.2847|15.7622
Číhalín|Třebíč|67507|49.2685|15.8122
Číhaň|Klatovy|34142|49.3425|13.4259
Číhošť|Havlíčkův Brod|58287|49.7419|15.3352
Čím|Příbram|26203|49.7786|14.3779
Čímice|Klatovy|34201|49.2537|13.606
Číměř|Jindřichův Hradec|37832|49.0607|15.0738
Číměř|Třebíč|67501|49.2002|15.9986
Číčenice|Strakonice|38771|49.1532|14.231
Číčovice|Praha-západ|25268|50.1568|14.2495
Čížkov|Pelhřimov|39301|49.4406|15.1186
Čížkov|Plzeň-jih|33564|49.5405|13.6835
Čížkovice|Litoměřice|41112|50.4843|14.0285
Čížkrajice|České Budějovice|37401|48.8066|14.6362
Čížov|Jihlava|58601|49.3873|15.575
Čížová|Písek|39831|49.3569|14.0932
Řehenice|Benešov|25167|49.8698|14.6503
Řehlovice|Ústí nad Labem|40313|50.6072|13.9542
Řeka|Frýdek-Místek|73955|49.6412|18.5715
Řemíčov|Tábor|39143|49.5151|14.7751
Řendějov|Kutná Hora|28522|49.7679|15.0805
Řenče|Plzeň-jih|33401|49.58|13.4146
Řepeč|Tábor|39161|49.4035|14.5197
Řepice|Strakonice|38601|49.2806|13.9335
Řepiště|Frýdek-Místek|73932|49.7335|18.3172
Řepníky|Ústí nad Orlicí|53865|49.9012|16.0798
Řepov|Mladá Boleslav|29301|50.4024|14.9571
Řepín|Mělník|27733|50.3666|14.6347
Řestoky|Chrudim|53851|49.9225|15.9167
Řetová|Ústí nad Orlicí|56141|49.9459|16.3813
Řetůvka|Ústí nad Orlicí|56141|49.9559|16.3561
Řevnice|Praha-západ|25230|49.9141|14.2359
Řevničov|Rakovník|27054|50.185|13.8083
Řečany nad Labem|Pardubice|53313|50.036|15.4775
Řečice|Pelhřimov|39601|49.603|15.3717
Řečice|Žďár nad Sázavou|59233|49.5131|16.064
Řeřichy|Rakovník|27035|50.0793|13.5859
Řikonín|Brno-venkov|59451|49.3645|16.3058
Řimovice|Benešov|25801|49.6964|14.9431
Řisuty|Kladno|27378|50.2166|14.0051
Řitka|Praha-západ|25203|49.8946|14.2993
Řitonice|Mladá Boleslav|29404|50.4083|15.1081
Řásná|Jihlava|58856|49.2211|15.3914
Řícmanice|Brno-venkov|66401|49.2576|16.694
Řídelov|Jihlava|58856|49.2346|15.4069
Řídeč|Olomouc|78501|49.7658|17.2569
Řídký|Svitavy|57001|49.8942|16.2432
Říkov|Náchod|55203|50.3844|16.0169
Říkovice|Přerov|75118|49.3816|17.4513
Římov|České Budějovice|37324|48.8557|14.4869
Římov|Třebíč|67522|49.1702|15.7577
Řípec|Tábor|39181|49.2143|14.7368
Říčany|Brno-venkov|66482|49.2151|16.3937
Říčany|Praha-východ|25101|49.9918|14.6544
Říčky|Brno-venkov|66483|49.233|16.3559
Říčky v Orlických horách|Rychnov nad Kněžnou|51761|50.2111|16.4591
Šabina|Sokolov|35601|50.1357|12.5824
Šafov|Znojmo|67106|48.8669|15.7348
Šakvice|Břeclav|69167|48.8976|16.7143
Šanov|Znojmo|67168|48.801|16.3787
Šanov|Rakovník|27031|50.0877|13.6313
Šanov|Zlín|76321|49.0456|17.8985
Šaplava|Hradec Králové|50353|50.3151|15.5421
Šaratice|Vyškov|68352|49.1176|16.8036
Šardice|Hodonín|69613|48.9641|17.0282
Šarovy|Zlín|76351|49.1487|17.607
Šatov|Znojmo|67122|48.7933|16.01
Šebestěnice|Kutná Hora|28601|49.8295|15.3654
Šebetov|Blansko|67935|49.5487|16.7117
Šebkovice|Třebíč|67545|49.1232|15.8137
Šebrov-Kateřina|Blansko|67922|49.3286|16.6025
Šebířov|Tábor|39143|49.5662|14.826
Šedivec|Ústí nad Orlicí|56401|50.0493|16.5358
Šelešovice|Kroměříž|76701|49.2549|17.3601
Šemnice|Karlovy Vary|36272|50.237|12.9762
Šenov|Ostrava-město|73934|49.7932|18.3762
Šenov u Nového Jičína|Nový Jičín|74242|49.6046|18.0034
Šerkovice|Brno-venkov|66601|49.3857|16.4301
Šestajovice|Náchod|55101|50.3412|16.0081
Šestajovice|Praha-východ|25092|50.1085|14.6818
Šetějovice|Benešov|25768|49.6453|15.2226
Ševětín|České Budějovice|37363|49.1002|14.5723
Šilheřovice|Opava|74715|49.9261|18.2703
Šimanov|Jihlava|58842|49.4582|15.4501
Šimonovice|Liberec|46312|50.7065|15.0527
Šindelová|Sokolov|35801|50.3188|12.6034
Široká Niva|Bruntál|79201|50.0639|17.4802
Široký Důl|Svitavy|57201|49.7461|16.2209
Šitbořice|Břeclav|69176|49.0144|16.7799
Šišma|Přerov|75111|49.464|17.5881
Škrdlovice|Žďár nad Sázavou|59101|49.6348|15.926
Škvorec|Praha-východ|25083|50.047|14.7305
Škvořetice|Strakonice|38801|49.4025|13.9492
Šlapanice|Brno-venkov|66451|49.1687|16.7274
Šlapanice|Kladno|27372|50.3148|14.1113
Šlapanov|Havlíčkův Brod|58251|49.5425|15.6578
Šluknov|Děčín|40777|51.0038|14.4527
Šléglov|Šumperk|78825|50.1531|16.9826
Šonov|Náchod|54971|50.5909|16.4016
Šošůvka|Blansko|67913|49.4106|16.752
Špindlerův Mlýn|Trutnov|54351|50.7263|15.6095
Špičky|Přerov|75366|49.5483|17.8079
Štarnov|Olomouc|78314|49.6862|17.2727
Šternberk|Olomouc|78501|49.7305|17.299
Štichov|Domažlice|34562|49.585|13.049
Štichovice|Plzeň-sever|33141|49.9779|13.3029
Štipoklasy|Kutná Hora|28401|49.8247|15.2134
Štoky|Havlíčkův Brod|58253|49.5026|15.5887
Štramberk|Nový Jičín|74266|49.5919|18.1175
Študlov|Svitavy|56904|49.6026|16.4984
Študlov|Vsetín|75612|49.1625|18.0833
Štáblovice|Opava|74782|49.8801|17.8186
Štíhlice|Praha-východ|28163|50.0057|14.7801
Štítary|Znojmo|67102|48.9352|15.8444
Štítina|Opava|74791|49.915|18.0126
Štítná nad Vláří-Popov|Zlín|76333|49.0707|17.9725
Štítov|Rokycany|33843|49.666|13.678
Štíty|Šumperk|78991|49.9613|16.7659
Štěchov|Blansko|67971|49.4524|16.5062
Štěchovice|Strakonice|38716|49.2555|13.7656
Štěchovice|Praha-západ|25207|49.8512|14.4055
Štědrá|Karlovy Vary|36452|50.0583|13.1143
Štěkeň|Strakonice|38751|49.2672|14.006
Štěměchy|Třebíč|67527|49.1934|15.7148
Štěnovice|Plzeň-jih|33209|49.6706|13.3997
Štěnovický Borek|Plzeň-město|33209|49.6498|13.4269
Štěpkov|Třebíč|67526|49.0841|15.6503
Štěpánkovice|Opava|74728|49.9575|18.0375
Štěpánov|Olomouc|78313|49.6841|17.2205
Štěpánov nad Svratkou|Žďár nad Sázavou|59263|49.5047|16.3392
Štěpánovice|České Budějovice|37373|49.0019|14.6534
Štěpánovice|Brno-venkov|66602|49.3731|16.3877
Štětkovice|Příbram|26401|49.6708|14.5063
Štětí|Litoměřice|41108|50.4531|14.3743
Šubířov|Prostějov|79852|49.6023|16.8134
Šumavské Hoštice|Prachatice|38471|49.0395|13.8724
Šumice|Brno-venkov|67175|48.9922|16.4375
Šumice|Uherské Hradiště|68731|49.0287|17.7222
Šumná|Znojmo|67102|48.9225|15.8711
Šumperk|Šumperk|78701|49.9779|16.9719
Šumvald|Olomouc|78385|49.8311|17.1329
Švihov|Klatovy|34012|49.4815|13.2843
Švihov|Rakovník|27033|50.1099|13.5644
Švábenice|Vyškov|68323|49.2785|17.1235
Švábov|Jihlava|58851|49.3085|15.3571
Šárovcova Lhota|Jičín|50759|50.4076|15.5624
Šípy|Rakovník|27034|50.0144|13.6166
Šťáhlavy|Plzeň-město|33203|49.6757|13.504
Žabeň|Frýdek-Místek|73925|49.7089|18.3043
Žabonosy|Kolín|28002|50.0355|15.0273
Žabovřesky|České Budějovice|37341|49.0029|14.335
Žabovřesky nad Ohří|Litoměřice|41002|50.4133|14.0911
Žabčice|Brno-venkov|66463|49.0117|16.6027
Žacléř|Trutnov|54201|50.6634|15.9107
Žalany|Teplice|41763|50.5901|13.9064
Žalhostice|Litoměřice|41101|50.5232|14.0915
Žalkovice|Kroměříž|76823|49.372|17.436
Žamberk|Ústí nad Orlicí|56401|50.0874|16.4653
Žampach|Ústí nad Orlicí|56401|50.0381|16.4273
Žandov|Česká Lípa|47107|50.714|14.3963
Žarošice|Hodonín|69634|49.0407|16.9672
Žatec|Jihlava|58862|49.2064|15.509
Žatec|Louny|43801|50.3273|13.5459
Žatčany|Brno-venkov|66453|49.088|16.7338
Ždánice|Hodonín|69632|49.0674|17.0276
Ždánice|Žďár nad Sázavou|59301|49.5476|16.2622
Ždánice|Kolín|28163|49.9695|14.9592
Ždánov|Domažlice|34401|49.461|12.8545
Ždírec|Havlíčkův Brod|58001|49.6293|15.642
Ždírec|Jihlava|58813|49.455|15.6786
Ždírec|Česká Lípa|47201|50.5156|14.6244
Ždírec|Plzeň-jih|33601|49.5511|13.573
Ždírec nad Doubravou|Havlíčkův Brod|58263|49.6961|15.8137
Žebrák|Beroun|26753|49.8758|13.8975
Žehuň|Kolín|28905|50.1356|15.2914
Žehušice|Kutná Hora|28575|49.9696|15.4075
Želatovice|Přerov|75116|49.4441|17.5063
Želechovice|Olomouc|78391|49.7542|17.144
Želechovice nad Dřevnicí|Zlín|76311|49.2181|17.7475
Želenice|Kladno|27341|50.2105|14.1646
Želenice|Most|43401|50.5277|13.7262
Želetava|Třebíč|67526|49.142|15.6731
Želetice|Hodonín|69637|49.0143|17.0082
Želetice|Znojmo|67134|48.9364|16.1829
Železnice|Jičín|50713|50.4728|15.3847
Železná|Beroun|26601|50.0098|14.091
Železná Ruda|Klatovy|34004|49.1375|13.2353
Železné|Brno-venkov|66601|49.3597|16.4505
Železný Brod|Jablonec nad Nisou|46822|50.6428|15.2542
Želeč|Tábor|39174|49.3184|14.6467
Želeč|Prostějov|79807|49.3461|17.0979
Želešice|Brno-venkov|66443|49.117|16.5815
Želiv|Pelhřimov|39444|49.5299|15.2219
Želivsko|Svitavy|56904|49.6413|16.5701
Želkovice|Louny|44001|50.4643|13.8768
Želnava|Prachatice|38451|48.8121|13.9651
Želízy|Mělník|27721|50.4238|14.4649
Ženklava|Nový Jičín|74267|49.5637|18.1073
Žeranovice|Kroměříž|76901|49.2916|17.6045
Žeravice|Hodonín|69647|49.023|17.2374
Žeraviny|Hodonín|69663|48.9083|17.3916
Žeretice|Jičín|50702|50.3536|15.4118
Žermanice|Frýdek-Místek|73937|49.7386|18.4429
Žernov|Náchod|55203|50.4305|16.0575
Žernov|Semily|51263|50.5568|15.2698
Žernovice|Prachatice|38301|49.0287|14.0396
Žernovník|Blansko|67921|49.407|16.5456
Žerotice|Znojmo|67134|48.9268|16.1688
Žerotín|Olomouc|78401|49.7246|17.1869
Žerotín|Louny|44001|50.2863|13.9122
Žerčice|Mladá Boleslav|29446|50.3743|15.036
Žerůtky|Blansko|67971|49.4404|16.5368
Žerůtky|Znojmo|67151|48.906|15.9632
Žichlínek|Ústí nad Orlicí|56301|49.884|16.6364
Žichovice|Klatovy|34201|49.2673|13.6279
Židlochovice|Brno-venkov|66701|49.0396|16.6189
Židněves|Mladá Boleslav|29406|50.4117|14.9946
Židovice|Jičín|50732|50.2955|15.3206
Židovice|Litoměřice|41183|50.4464|14.2332
Žihle|Plzeň-sever|33165|50.045|13.3751
Žihobce|Klatovy|34201|49.2156|13.6311
Žilina|Kladno|27301|50.1|14.0059
Žilov|Plzeň-sever|33011|49.8401|13.3133
Žim|Teplice|41501|50.5851|13.9654
Žimutice|České Budějovice|37366|49.2038|14.5105
Žinkovy|Plzeň-jih|33554|49.4835|13.4896
Žirov|Pelhřimov|39301|49.4643|15.3237
Žirovnice|Pelhřimov|39468|49.2533|15.1883
Žitenice|Litoměřice|41141|50.5554|14.1568
Žitovlice|Nymburk|28934|50.2941|15.1371
Živanice|Pardubice|53342|50.0623|15.6449
Životice|Plzeň-jih|33544|49.4666|13.6853
Životice u Nového Jičína|Nový Jičín|74272|49.5572|18.0474
Žiželice|Kolín|28129|50.132|15.3933
Žiželice|Louny|43801|50.3675|13.5401
Žižice|Kladno|27401|50.2464|14.154
Žižkovo Pole|Havlíčkův Brod|58222|49.6107|15.7352
Žlebské Chvalovice|Chrudim|53843|49.8928|15.5668
Žleby|Kutná Hora|28561|49.8897|15.4886
Žlunice|Jičín|50734|50.3022|15.3821
Žlutava|Zlín|76361|49.1999|17.4905
Žlutice|Karlovy Vary|36452|50.092|13.1631
Žulová|Jeseník|79065|50.3094|17.0988
Žumberk|Chrudim|53836|49.8731|15.8582
Županovice|Jindřichův Hradec|37881|48.9572|15.5062
Županovice|Příbram|26301|49.7079|14.2988
Žádovice|Hodonín|69649|49.0135|17.197
Žákava|Plzeň-jih|33204|49.6301|13.5308
Žákovice|Přerov|75354|49.4543|17.6601
Žáky|Kutná Hora|28601|49.8854|15.3684
Žár|České Budějovice|37401|48.807|14.7083
Žáravice|Pardubice|53316|50.1059|15.5572
Žárovná|Prachatice|38301|49.0463|13.8994
Žítková|Uherské Hradiště|68774|48.9804|17.8803
Žíšov|Tábor|39181|49.2|14.6935
Žďár|Jindřichův Hradec|37842|49.2542|15.0767
Žďár|Písek|39811|49.2332|14.2279
Žďár|Blansko|67902|49.4217|16.6979
Žďár|Mladá Boleslav|29412|50.5438|15.0804
Žďár|Rakovník|27033|50.0586|13.4597
Žďár nad Metují|Náchod|54955|50.5388|16.2134
Žďár nad Orlicí|Rychnov nad Kněžnou|51723|50.1199|16.0694
Žďár nad Sázavou|Žďár nad Sázavou|59101|49.5643|15.9395
Žďárec|Brno-venkov|59456|49.3799|16.2666
Žďárek|Liberec|46344|50.6405|15.1116
Žďárky|Náchod|54937|50.469|16.2279
Žďárná|Blansko|67952|49.4687|16.7586
`;

let cache: CzCity[] | null = null;
let index: Array<{ city: CzCity; norm: string }> | null = null;

export function stripDiacritics(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function load(): Array<{ city: CzCity; norm: string }> {
  if (index) return index;
  cache = RAW.trim()
    .split("\n")
    .map((line) => {
      const [name, district, postalCode, lat, lng] = line.split("|");
      return {
        name: name ?? "",
        district: district ?? "",
        postalCode: postalCode ?? "",
        lat: Number(lat),
        lng: Number(lng),
      } satisfies CzCity;
    })
    .filter((c) => c.name && /^\d{5}$/.test(c.postalCode));
  index = cache.map((city) => ({ city, norm: stripDiacritics(city.name) }));
  return index;
}

/** ID obce ve tvaru cz:<PSČ>:<název> – používá se místo Google placeId. */
export function cityId(c: CzCity): string {
  return `cz:${c.postalCode}:${c.name}`;
}

export function findCityById(id: string): CzCity | null {
  if (!id.startsWith("cz:")) return null;
  const [, postalCode, ...rest] = id.split(":");
  const name = rest.join(":");
  return (
    load().find((e) => e.city.postalCode === postalCode && e.city.name === name)?.city ?? null
  );
}

/** Levenshteinova vzdálenost s předčasným ukončením (tolerance překlepů). */
function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const v = Math.min(prev[j]! + 1, cur[j - 1]! + 1, prev[j - 1]! + cost);
      cur[j] = v;
      if (v < best) best = v;
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length]!;
}

/**
 * Fulltext bez ohledu na diakritiku, s tolerancí překlepů.
 * Pořadí: přesná shoda → prefix → prefix slova → obsahuje → překlep (Levenshtein).
 */
export function searchCities(query: string, limit = 8): CzCity[] {
  const q = stripDiacritics(query).replace(/\s+/g, " ");
  if (q.length < 2) return [];

  // Hledání podle PSČ (uživatel zadá číslice do pole města).
  const digits = q.replace(/\D/g, "");
  if (digits.length >= 3 && /^[\d\s]+$/.test(q)) {
    return load()
      .filter((e) => e.city.postalCode.startsWith(digits))
      .map((e) => e.city)
      .sort((a, b) => a.name.length - b.name.length)
      .slice(0, limit);
  }

  const maxTypos = q.length >= 8 ? 2 : q.length >= 4 ? 1 : 0;
  const scored: Array<{ city: CzCity; score: number }> = [];

  for (const e of load()) {
    const n = e.norm;
    let score: number;
    if (n === q) score = 0;
    else if (n.startsWith(q)) score = 1;
    else if (n.split(/[\s-]+/).some((w) => w.startsWith(q))) score = 2;
    else if (n.includes(q)) score = 3;
    else if (maxTypos > 0) {
      const d = editDistance(q, n, maxTypos);
      if (d > maxTypos) {
        // překlep jen v prvním slově názvu (např. "Ceske Budejovyce")
        const head = n.slice(0, q.length + maxTypos);
        const dh = editDistance(q, head, maxTypos);
        if (dh > maxTypos) continue;
        score = 5 + dh;
      } else score = 4 + d;
    } else continue;
    scored.push({ city: e.city, score });
  }

  return scored
    .sort((a, b) => a.score - b.score || a.city.name.length - b.city.name.length)
    .slice(0, limit)
    .map((s) => s.city);
}


/** Najde obec (nebo nejbližší obec) podle PSČ. */
export function findByPostalCode(postalCode: string): CzCity | null {
  const pc = postalCode.replace(/\s+/g, "");
  const matches = load().filter((e) => e.city.postalCode === pc);
  if (matches.length === 0) return null;
  return matches.sort((a, b) => a.city.name.length - b.city.name.length)[0]!.city;
}

/** Ověří, že PSČ odpovídá vybranému městu (nebo jinému městu se stejným PSČ). */
export function postalMatchesCity(postalCode: string, cityName: string): boolean {
  const pc = postalCode.replace(/\s+/g, "");
  const n = stripDiacritics(cityName);
  return load().some((e) => e.city.postalCode === pc && (e.norm === n || e.norm.includes(n)));
}
