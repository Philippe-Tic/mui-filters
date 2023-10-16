# Rendu 🧪

Bon courage pour la lecture Maxime, bien sûr n'hésite pas à critiquer, ça faisait quelques temps que je n'avais pas configurer autant de chose en typescript (et ça m'a fait un rappel en réinstallant un projet from scratch depuis que Next fait parti de la config "par défaut" de React !)

Je n'ai pas assez de temps perso avant mercredi pour faire la partie "Pour aller plus loin", j'imagine bien l'idée de combiner les filtres en fonction d'opérateurs logiques c'est une bonne petite gymnastique pour le cerveau et on pourrait imaginer du récursif pour ne pas limiter le nombre de niveau 😛

Je te mets une partie "Auto critique" de mon travail si ça t'intéresse, et hâte de se rencontrer pour débriefer de cela et voir si cela te convient 😄

## Auto critique

En terme de style j'ai fait le minimum en juste installant MUI et le Reset CSS proposé par la library, j'ai pas fait de theming vu que ce n'avait pas l'air d'être le sujet et je suis resté sur le fonctionnel sans aller trop loin. J'ai aussi fait le minimum syndical sur le responsive et honnêtement les cards sont pas sexy je me suis pas trop pris la tête sur la présentation 😂

Sur la partie typage, cela faisait longtemps que je n'avais pas setup autant de chose mine de rien et je pense que tu auras sûrement des retours là dessus et que j'ai laissé quelques erreurs passés qui pourrait jouer sur la mintenabilité si c'était un vrai projet, je pense que ça peut être améliorer mais je pense quand même avoir cadré le typage un minimum (en m'aidant bien sûr d'eslint)

Sur la partie fonctionnel, j'ai laissé volontairement la possibilité de filtrer toutes les propriétés même si Category et CategoryID était redondant. J'ai effacé les doublon de Category ce que j'aurai pu faire aussi sur les autres champs (je me suis pas pris la tête vu que le jeu de donné n'avait pas d'autres doublon a priori). J'ai normalement fait en sorte que les opérateurs soient cohérent en fonction de la propriété, pareil pour le dernière input de valeur qui change aussi en fonction des autres.

Si on parle d'accessibilité, il doit y avoir pas mal d'alt et autre aria label etc que je n'ai pas du set, c'était pas ma priorité et par manque de temps je pense pas le faire a moins que j'en trouve, mais l'idée est là dans la vraie vie j'aurai fait l'effort promis 😂

En te souhaitant une bonne review et je suis à ta dispo !