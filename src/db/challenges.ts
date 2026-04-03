export type Gender = 'M' | 'F' | 'T';
export type Level = 'soft' | 'spicy' | 'wild' | 'extreme' | 'submission';
export type Language = 'es' | 'en' | 'fr' | 'zh';

export interface Player {
  id: string;
  name: string;
  gender: Gender;
  exclusions: string[];
  genderExclusions: Gender[];
  absent: boolean;
}

export interface Challenge {
  id: string;
  level: Level;
  text: {
    es: string | Record<Gender, string>;
  };
}

export const challenges: Challenge[] = [
  // --- NIVEL: SOFT (50 Desafíos) ---
  { id: 's01', level: 'soft', text: { es: '{p1} debe dar un beso francés profundo a {p2} durante 45 segundos.' } },
  { id: 's02', level: 'soft', text: { es: '{p1} debe lamer el lóbulo de la oreja de {p2} susurrando algo sucio.' } },
  { id: 's03', level: 'soft', text: { es: '{p1} debe quitarle una prenda a {p2} usando solo los dientes.' } },
  { id: 's04', level: 'soft', text: { es: '{p1} debe dar un masaje con aceite en los hombros de {p2}.' } },
  { id: 's05', level: 'soft', text: { es: '{p1} debe morder suavemente el cuello de {p2} hasta dejar una marca.' } },
  { id: 's06', level: 'soft', text: { es: '{p1} debe lamer el ombligo de {p2} y bajar hasta el elástico de su ropa.' } },
  { id: 's07', level: 'soft', text: { es: '{p1} debe lamer los dedos de las manos de {p2} uno por uno.' } },
  { id: 's08', level: 'soft', text: { es: '{p1} debe bailar sensualmente sobre el regazo de {p2} durante 1 minuto.' } },
  { id: 's09', level: 'soft', text: { es: '{p1} debe dejar que {p2} le meta un hielo por la espalda.' } },
  { id: 's10', level: 'soft', text: { es: '{p1} debe desabrochar el cinturón o pantalón de {p2} lentamente.' } },
  { id: 's11', level: 'soft', text: { es: '{p1} debe lamer el interior de la muñeca de {p2}.' } },
  { id: 's12', level: 'soft', text: { es: '{p1} debe morder el labio inferior de {p2} con mucho deseo.' } },
  { id: 's13', level: 'soft', text: { es: '{p1} debe masajear los pies de {p2} de forma erótica.' } },
  { id: 's14', level: 'soft', text: { es: '{p1} debe lamer alcohol del cuello de {p2}.' } },
  { id: 's15', level: 'soft', text: { es: '{p1} debe abrazar a {p2} cuerpo a cuerpo durante 1 minuto.' } },
  { id: 's16', level: 'soft', text: { es: '{p1} debe lamer suavemente la clavícula de {p2}.' } },
  { id: 's17', level: 'soft', text: { es: '{p1} debe dar besos por toda la espalda de {p2}.' } },
  { id: 's18', level: 'soft', text: { es: '{p1} debe susurrar su mayor secreto sexual al oído de {p2}.' } },
  { id: 's19', level: 'soft', text: { es: '{p1} debe morder suavemente el hombro de {p2}.' } },
  { id: 's20', level: 'soft', text: { es: '{p1} debe lamer las palmas de las manos de {p2}.' } },
  { id: 's21', level: 'soft', text: { es: '{p1} debe mirar fijamente a los ojos de {p2} mientras le acaricia la cara.' } },
  { id: 's22', level: 'soft', text: { es: '{p1} debe quitarle los calcetines a {p2} con la boca.' } },
  { id: 's23', level: 'soft', text: { es: '{p1} debe lamer el cuello de {p2} de abajo hacia arriba.' } },
  { id: 's24', level: 'soft', text: { es: '{p1} debe dar nalgadas suaves a {p2} mientras le besa.' } },
  { id: 's25', level: 'soft', text: { es: '{p1} debe beber algo de un sorbo directamente de la boca de {p2}.' } },
  { id: 's26', level: 'soft', text: { es: '{p1} debe morder suavemente la punta de la nariz de {p2}.' } },
  { id: 's27', level: 'soft', text: { es: '{p1} debe lamer el hueco detrás de la rodilla de {p2}.' } },
  { id: 's28', level: 'soft', text: { es: '{p1} debe acariciar el torso de {p2} por debajo de la ropa.' } },
  { id: 's29', level: 'soft', text: { es: '{p1} debe dar un beso en cada párpado de {p2}.' } },
  { id: 's30', level: 'soft', text: { es: '{p1} debe describir qué prenda de {p2} le quitaría primero.' } },
  { id: 's31', level: 'soft', text: { es: '{p1} debe masajear las sienes de {p2} de forma relajante.' } },
  { id: 's32', level: 'soft', text: { es: '{p1} debe lamer el dedo índice de {p2} como si fuera un helado.' } },
  { id: 's33', level: 'soft', text: { es: '{p1} debe morder suavemente la barbilla de {p2}.' } },
  { id: 's34', level: 'soft', text: { es: '{p1} debe soplar aire caliente en el oído de {p2}.' } },
  { id: 's35', level: 'soft', text: { es: '{p1} debe dar un masaje en las manos de {p2} usando saliva.' } },
  { id: 's36', level: 'soft', text: { es: '{p1} debe lamer la línea del pelo de {p2}.' } },
  { id: 's37', level: 'soft', text: { es: '{p1} debe rozar sus labios con los de {p2} sin llegar a besarle.' } },
  { id: 's38', level: 'soft', text: { es: '{p1} debe masajear los muslos internos de {p2} por encima de la ropa.' } },
  { id: 's39', level: 'soft', text: { es: '{p1} debe lamer suavemente la mejilla de {p2}.' } },
  { id: 's40', level: 'soft', text: { es: '{p1} debe desabrochar un botón de la ropa de {p2}.' } },
  { id: 's41', level: 'soft', text: { es: '{p1} debe oler profundamente el cuello de {p2}.' } },
  { id: 's42', level: 'soft', text: { es: '{p1} debe morder suavemente el lóbulo de la oreja de {p2}.' } },
  { id: 's43', level: 'soft', text: { es: '{p1} debe lamer la nuca de {p2}.' } },
  { id: 's44', level: 'soft', text: { es: '{p1} debe dar un beso en la frente de {p2}.' } },
  { id: 's45', level: 'soft', text: { es: '{p1} debe acariciar el cabello de {p2} mientras le susurra algo sexy.' } },
  { id: 's46', level: 'soft', text: { es: '{p1} debe morder suavemente el brazo de {p2}.' } },
  { id: 's47', level: 'soft', text: { es: '{p1} debe lamer el empeine del pie de {p2}.' } },
  { id: 's48', level: 'soft', text: { es: '{p1} debe dar besos en la mano de {p2} subiendo hasta el hombro.' } },
  { id: 's49', level: 'soft', text: { es: '{p1} debe masajear la espalda baja de {p2}.' } },
  { id: 's50', level: 'soft', text: { es: '{p1} debe dejar que {p2} le muerda el labio superior.' } },

  // --- NIVEL: SPICY (50 Desafíos - Oral y Genital) ---
  {
    id: 'sp01',
    level: 'spicy',
    text: {
      es: {
        F: '{p1} debe comerle el coño a {p2} intensamente durante 1 minuto.',
        M: '{p1} debe chupar la polla de {p2} con mucha saliva y profundidad.',
        T: '{p1} debe practicar sexo oral a {p2} intensamente durante 1 minuto.'
      }
    }
  },
  {
    id: 'sp02',
    level: 'spicy',
    text: {
      es: {
        F: '{p1} debe lamer el clítoris de {p2} solo con la punta de la lengua muy rápido.',
        M: '{p1} debe succionar los testículos de {p2} uno a uno.',
        T: '{p1} debe lamer la zona íntima de {p2} con mucha agresividad.'
      }
    }
  },
  {
    id: 'sp03',
    level: 'spicy',
    text: {
      es: {
        F: '{p1} debe meter sus dedos en la vagina de {p2} y luego lamerlos.',
        M: '{p1} debe chupar la punta del pene de {p2} mirándole a los ojos.',
        T: '{p1} debe recorrer con la lengua toda la zona íntima de {p2}.'
      }
    }
  },
  {
    id: 'sp04',
    level: 'spicy',
    text: {
      es: {
        F: '{p1} debe lamer los labios mayores de {p2} de arriba a abajo.',
        M: '{p1} debe succionar el glande de {p2} como si fuera un caramelo.',
        T: '{p1} debe masajear el sexo de {p2} con mucha lubricación.'
      }
    }
  },
  { id: 'sp05', level: 'spicy', text: { es: '{p1} y {p2} deben hacer un 69 real durante 1 minuto.' } },
  { id: 'sp06', level: 'spicy', text: { es: '{p1} debe lamer el perineo (el anito) de {p2} durante 45 segundos.' } },
  { id: 'sp07', level: 'spicy', text: { es: '{p1} debe chupar los dedos de {p2} después de que {p2} los haya mojado en su sexo.' } },
  { id: 'sp08', level: 'spicy', text: { es: { F: '{p1} debe succionar los pezones de {p2} mientras le toca el clítoris.', M: '{p1} debe succionar los pezones de {p2} mientras le toca la polla.', T: '{p1} debe succionar los pezones de {p2} mientras le toca el sexo.' } } },
  { id: 'sp09', level: 'spicy', text: { es: { F: '{p1} debe lamer el jugo vaginal de {p2} directamente.', M: '{p1} debe lamer el líquido preseminal de {p2} de la punta.', T: '{p1} debe lamer los fluidos de {p2} directamente.' } } },
  { id: 'sp10', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} y luego besar a p2 con su sabor.' } },
  { id: 'sp11', level: 'spicy', text: { es: '{p1} debe introducir su lengua tanto como pueda en el sexo de {p2}.' } },
  { id: 'sp12', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} siguiendo el ritmo de los gemidos de p2.' } },
  { id: 'sp13', level: 'spicy', text: { es: '{p1} debe masturbar a {p2} con la boca hasta que p2 no pueda más.' } },
  { id: 'sp14', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} mientras p2 le da nalgadas suaves.' } },
  { id: 'sp15', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} y luego soplar aire frío sobre la humedad.' } },
  { id: 'sp16', level: 'spicy', text: { es: { F: '{p1} debe lamer el monte de venus de {p2} con mucha saliva.', M: '{p1} debe lamer la base del pene y los huevos de {p2}.', T: '{p1} debe lamer el pubis de {p2} con mucha saliva.' } } },
  { id: 'sp17', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} sin usar las manos para nada.' } },
  { id: 'sp18', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} mientras el grupo cuenta hasta 30.' } },
  { id: 'sp19', level: 'spicy', text: { es: '{p1} debe morder suavemente el muslo interno de {p2} mientras le lame el sexo.' } },
  { id: 'sp20', level: 'spicy', text: { es: '{p1} debe introducir su lengua en el sexo de {p2} y vibrarla.' } },
  { id: 'sp21', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} y luego morder suavemente sus pezones.' } },
  { id: 'sp22', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} con los ojos vendados.' } },
  { id: 'sp23', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 le tira del pelo.' } },
  { id: 'sp24', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} imitando un animal hambriento.' } },
  { id: 'sp25', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} y luego lamer sus propios labios.' } },
  { id: 'sp26', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} mientras le acaricia el culo.' } },
  { id: 'sp27', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} muy rápido y luego muy lento.' } },
  { id: 'sp28', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} y pedirle que gima más fuerte.' } },
  { id: 'sp29', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} de forma ruidosa.' } },
  { id: 'sp30', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 le muerde la oreja.' } },
  { id: 'sp31', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} dibujando círculos.' } },
  { id: 'sp32', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} y luego lamerle los pies.' } },
  { id: 'sp33', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 está de pie.' } },
  { id: 'sp34', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} mientras el grupo decide la velocidad.' } },
  { id: 'sp35', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} y terminar con un beso apasionado.' } },
  { id: 'sp36', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} y luego lamer sus propios dedos.' } },
  { id: 'sp37', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} y luego soplar aire caliente.' } },
  { id: 'sp38', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 se masturba.' } },
  { id: 'sp39', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} y luego lamerle las axilas.' } },
  { id: 'sp40', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 le escupe en la boca.' } },
  { id: 'sp41', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} y luego lamerle el ombligo.' } },
  { id: 'sp42', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 le insulta cariñosamente.' } },
  { id: 'sp43', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} y luego lamerle el perineo.' } },
  { id: 'sp44', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 cuenta hacia atrás.' } },
  { id: 'sp45', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} y luego lamerle el cuello.' } },
  { id: 'sp46', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 le acaricia el pelo.' } },
  { id: 'sp47', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} y luego lamerle las palmas.' } },
  { id: 'sp48', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 le mira a los ojos.' } },
  { id: 'sp49', level: 'spicy', text: { es: '{p1} debe chupar el sexo de {p2} y luego lamerle los labios.' } },
  { id: 'sp50', level: 'spicy', text: { es: '{p1} debe lamer el sexo de {p2} y terminar con un gemido.' } },

  // --- NIVEL: WILD (50 Desafíos - Anal y Fetiches) ---
  { id: 'w01', level: 'wild', text: { es: '{p1} debe lamer profundamente el ano de {p2} (beso negro) durante 45 segundos.' } },
  { id: 'w02', level: 'wild', text: { es: '{p1} debe introducir un dedo con lubricante en el ano de {p2} lentamente.' } },
  { id: 'w03', level: 'wild', text: { es: '{p1} debe dar 10 nalgadas fuertes en el culo de {p2} y luego lamer donde golpeó.' } },
  { id: 'w04', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} mientras {p2} está en posición de perrito.' } },
  { id: 'w05', level: 'wild', text: { es: '{p1} debe meter su lengua en el ano de {p2} lo más profundo posible.' } },
  { id: 'w06', level: 'wild', text: { es: '{p1} debe usar sus dedos para abrir el ano de {p2} y soplar aire caliente.' } },
  { id: 'w07', level: 'wild', text: { es: '{p1} debe lamer el espacio entre el ano y el sexo de {p2}.' } },
  { id: 'w08', level: 'wild', text: { es: '{p1} debe introducir un dedo en el ano de {p2} y luego lamerlo.' } },
  { id: 'w09', level: 'wild', text: { es: '{p1} debe masajear el ano de {p2} con su propia lengua en círculos.' } },
  { id: 'w10', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} mientras p2 está boca abajo.' } },
  { id: 'w11', level: 'wild', text: { es: '{p1} debe succionar el orificio anal de {p2}.' } },
  { id: 'w12', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} con mucha saliva.' } },
  { id: 'w13', level: 'wild', text: { es: '{p1} debe introducir dos dedos en el ano de {p2} con permiso.' } },
  { id: 'w14', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} mientras p2 le muerde la oreja.' } },
  { id: 'w15', level: 'wild', text: { es: '{p1} debe morder suavemente las nalgas de {p2} mientras le lame el ano.' } },
  { id: 'w16', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} siguiendo el ritmo de una música imaginaria.' } },
  { id: 'w17', level: 'wild', text: { es: '{p1} debe introducir un dedo en el ano de {p2} y girarlo.' } },
  { id: 'w18', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} y luego lamer sus propios dedos.' } },
  { id: 'w19', level: 'wild', text: { es: '{p1} debe dar una nalgada a {p2} por cada letra de su nombre.' } },
  { id: 'w20', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} con los ojos cerrados.' } },
  { id: 'w21', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} y luego besar a p2.' } },
  { id: 'w22', level: 'wild', text: { es: '{p1} debe introducir un dedo en el ano de {p2} mientras le besa.' } },
  { id: 'w23', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} y describir el aroma.' } },
  { id: 'w24', level: 'wild', text: { es: '{p1} debe masajear las nalgas de {p2} con sus propios genitales.' } },
  { id: 'w25', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} mientras p2 gime su nombre.' } },
  { id: 'w26', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} imitando un animal.' } },
  { id: 'w27', level: 'wild', text: { es: '{p1} debe dar nalgadas a {p2} rítmicamente.' } },
  { id: 'w28', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} y luego soplar aire caliente.' } },
  { id: 'w29', level: 'wild', text: { es: '{p1} debe introducir un dedo en el ano de {p2} y decir una guarrada.' } },
  { id: 'w30', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} mientras el grupo aplaude.' } },
  { id: 'w31', level: 'wild', text: { es: '{p1} debe masajear las nalgas de {p2} con sus pies.' } },
  { id: 'w32', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} muy rápido.' } },
  { id: 'w33', level: 'wild', text: { es: '{p1} debe introducir dos dedos en el culo de {p2} y abrirlos.' } },
  { id: 'w34', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} con mucha saliva.' } },
  { id: 'w35', level: 'wild', text: { es: '{p1} debe morder el culo de {p2} lo más fuerte que pueda sin herir.' } },
  { id: 'w36', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} mientras p2 hace twerking.' } },
  { id: 'w37', level: 'wild', text: { es: '{p1} debe introducir un dedo en el ano de {p2} mientras le muerde la oreja.' } },
  { id: 'w38', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} de arriba a abajo.' } },
  { id: 'w39', level: 'wild', text: { es: '{p1} debe dar una nalgada a {p2} y luego lamer donde golpeó.' } },
  { id: 'w40', level: 'wild', text: { es: '{p1} debe introducir un dedo en el ano de {p2} y moverlo en círculos.' } },
  { id: 'w41', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} mientras p2 gime fuerte.' } },
  { id: 'w42', level: 'wild', text: { es: '{p1} debe masajear el ano de {p2} con la lengua.' } },
  { id: 'w43', level: 'wild', text: { es: '{p1} debe introducir un dedo en el ano de {p2} y describir la sensación.' } },
  { id: 'w44', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} sin usar las manos.' } },
  { id: 'w45', level: 'wild', text: { es: '{p1} debe dar 20 nalgadas rápidas a {p2}.' } },
  { id: 'w46', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} y terminar con un beso largo.' } },
  { id: 'w47', level: 'wild', text: { es: '{p1} debe introducir un dedo en el ano de {p2} y luego lamerlo.' } },
  { id: 'w48', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} imitando un perro.' } },
  { id: 'w49', level: 'wild', text: { es: '{p1} debe dar nalgadas a {p2} rítmicamente.' } },
  { id: 'w50', level: 'wild', text: { es: '{p1} debe lamer el ano de {p2} y luego soplar aire caliente.' } },

  // --- NIVEL: EXTREME (50 Desafíos - Penetración y Posiciones) ---
  { id: 'e01', level: 'extreme', text: { es: '{p1} debe realizar la postura del perrito con {p2} y simular una penetración salvaje.' } },
  { id: 'e02', level: 'extreme', text: { es: '{p1} debe sentarse en la cara de {p2} sin ropa y dejar que use su lengua libremente.' } },
  { id: 'e03', level: 'extreme', text: { es: '{p1} debe realizar la postura del misionero con {p2} con las piernas al hombro.' } },
  { id: 'e04', level: 'extreme', text: { es: '{p1} debe frotar sus genitales desnudos contra los de {p2} con fuerza.' } },
  { id: 'e05', level: 'extreme', text: { es: '{p1} debe dejarse penetrar (o simularlo) por {p2} mientras el grupo mira.' } },
  { id: 'e06', level: 'extreme', text: { es: '{p1} debe realizar la postura de la carretilla con {p2}.' } },
  { id: 'e07', level: 'extreme', text: { es: '{p1} debe introducir dos dedos en el sexo de {p2} y vibrar rápido.' } },
  { id: 'e08', level: 'extreme', text: { es: '{p1} debe lamer el sexo de {p2} mientras {p2} le penetra con los dedos.' } },
  { id: 'e09', level: 'extreme', text: { es: '{p1} debe realizar un 69 real en el suelo con {p2}.' } },
  { id: 'e10', level: 'extreme', text: { es: '{p1} debe realizar la postura de la tijera con {p2}.' } },
  { id: 'e11', level: 'extreme', text: { es: '{p1} debe realizar la postura de la amazona con {p2}.' } },
  { id: 'e12', level: 'extreme', text: { es: '{p1} debe realizar la postura del tornillo con {p2}.' } },
  { id: 'e13', level: 'extreme', text: { es: '{p1} debe realizar la postura del águila con {p2}.' } },
  { id: 'e14', level: 'extreme', text: { es: '{p1} debe realizar la postura del puente con {p2}.' } },
  { id: 'e15', level: 'extreme', text: { es: '{p1} debe realizar la postura de la flor de loto con {p2}.' } },
  { id: 'e16', level: 'extreme', text: { es: '{p1} debe realizar la postura del helicóptero con {p2}.' } },
  { id: 'e17', level: 'extreme', text: { es: '{p1} debe realizar la postura del 69 invertido con {p2}.' } },
  { id: 'e18', level: 'extreme', text: { es: '{p1} debe realizar la postura de la cuchara con {p2}.' } },
  { id: 'e19', level: 'extreme', text: { es: '{p1} debe simular una penetración anal con {p2}.' } },
  { id: 'e20', level: 'extreme', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 le penetra analmente con un dildo.' } },
  { id: 'e21', level: 'extreme', text: { es: '{p1} debe dejar que {p2} le orine encima.' } },
  { id: 'e22', level: 'extreme', text: { es: '{p1} debe realizar un striptease completo para {p2}.' } },
  { id: 'e23', level: 'extreme', text: { es: '{p1} debe dejar que {p2} le escupa en el sexo y luego lamerlo.' } },
  { id: 'e24', level: 'extreme', text: { es: '{p1} debe masturbar a {p2} con los pies.' } },
  { id: 'e25', level: 'extreme', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 le da nalgadas fuertes.' } },
  { id: 'e26', level: 'extreme', text: { es: '{p1} debe dejar que {p2} le meta tres dedos en el sexo.' } },
  { id: 'e27', level: 'extreme', text: { es: '{p1} debe realizar la postura de la araña con {p2}.' } },
  { id: 'e28', level: 'extreme', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 le muerde los pezones.' } },
  { id: 'e29', level: 'extreme', text: { es: '{p1} debe realizar la postura del yunque con {p2}.' } },
  { id: 'e30', level: 'extreme', text: { es: '{p1} debe dejar que {p2} le penetre analmente con los dedos.' } },
  { id: 'e31', level: 'extreme', text: { es: '{p1} debe realizar la postura de la silla con {p2}.' } },
  { id: 'e32', level: 'extreme', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 le insulta.' } },
  { id: 'e33', level: 'extreme', text: { es: '{p1} debe realizar la postura del columpio con {p2}.' } },
  { id: 'e34', level: 'extreme', text: { es: '{p1} debe dejar que {p2} le muerda los genitales suavemente.' } },
  { id: 'e35', level: 'extreme', text: { es: '{p1} debe realizar la postura del arco con {p2}.' } },
  { id: 'e36', level: 'extreme', text: { es: '{p1} debe lamer el sexo de {p2} mientras el grupo decide el ritmo.' } },
  { id: 'e37', level: 'extreme', text: { es: '{p1} debe realizar la postura del salto del tigre con {p2}.' } },
  { id: 'e38', level: 'extreme', text: { es: '{p1} debe dejar que {p2} le penetre con un objeto vibrador.' } },
  { id: 'e39', level: 'extreme', text: { es: '{p1} debe realizar la postura del rodeo con {p2}.' } },
  { id: 'e40', level: 'extreme', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 gime fuerte.' } },
  { id: 'e41', level: 'extreme', text: { es: '{p1} debe realizar la postura de la montaña con {p2}.' } },
  { id: 'e42', level: 'extreme', text: { es: '{p1} debe dejar que {p2} le ate las manos mientras le penetra.' } },
  { id: 'e43', level: 'extreme', text: { es: '{p1} debe realizar la postura del dragón con {p2}.' } },
  { id: 'e44', level: 'extreme', text: { es: '{p1} debe lamer el sexo de {p2} y luego escupir en su cara.' } },
  { id: 'e45', level: 'extreme', text: { es: '{p1} debe realizar la postura de la serpiente con {p2}.' } },
  { id: 'e46', level: 'extreme', text: { es: '{p1} debe dejar que {p2} le use como objeto sexual 1 min.' } },
  { id: 'e47', level: 'extreme', text: { es: '{p1} debe realizar la postura del nudo con {p2}.' } },
  { id: 'e48', level: 'extreme', text: { es: '{p1} debe lamer el sexo de {p2} y luego lamer el suelo.' } },
  { id: 'e49', level: 'extreme', text: { es: '{p1} debe realizar la postura del péndulo con {p2}.' } },
  { id: 'e50', level: 'extreme', text: { es: '{p1} debe lamer el sexo de {p2} y terminar con un gemido alto.' } },

  // --- NIVEL: SUBMISSION (50 Desafíos - Órdenes y Castigos) ---
  { id: 'sub01', level: 'submission', text: { es: '{p1} debe ponerse de rodillas y lamer el sexo de {p2} llamándole Amo/Ama.' } },
  { id: 'sub02', level: 'submission', text: { es: '{p1} debe dejarse vendar los ojos y permitir que {p2} haga lo que quiera 1 min.' } },
  { id: 'sub03', level: 'submission', text: { es: '{p1} debe gatear por la sala y ladrar mientras {p2} le da nalgadas.' } },
  { id: 'sub04', level: 'submission', text: { es: '{p1} debe lamer el suelo alrededor de los pies de {p2}.' } },
  { id: 'sub05', level: 'submission', text: { es: '{p1} debe recibir 10 azotes fuertes en el culo por parte de {p2}.' } },
  { id: 'sub06', level: 'submission', text: { es: '{p1} debe lamer las botas o pies de {p2} con devoción.' } },
  { id: 'sub07', level: 'submission', text: { es: '{p1} debe pedir perdón a {p2} lamiendo su entrepierna.' } },
  { id: 'sub08', level: 'submission', text: { es: '{p1} debe dejar que {p2} le escupa en la cara.' } },
  { id: 'sub09', level: 'submission', text: { es: '{p1} debe actuar como el esclavo de {p2} el resto de la ronda.' } },
  { id: 'sub10', level: 'submission', text: { es: '{p1} debe lamer el ano de {p2} mientras p2 le insulta.' } },
  { id: 'sub11', level: 'submission', text: { es: '{p1} debe recibir una orden humillante de {p2}.' } },
  { id: 'sub12', level: 'submission', text: { es: '{p1} debe dejar que {p2} le pise el pecho con los pies desnudos.' } },
  { id: 'sub13', level: 'submission', text: { es: '{p1} debe lamer el sudor de {p2}.' } },
  { id: 'sub14', level: 'submission', text: { es: '{p1} debe ser atado de manos por {p2}.' } },
  { id: 'sub15', level: 'submission', text: { es: '{p1} debe lamer el sexo de {p2} solo cuando p2 lo ordene.' } },
  { id: 'sub16', level: 'submission', text: { es: '{p1} debe recibir nalgadas de cada miembro del grupo.' } },
  { id: 'sub17', level: 'submission', text: { es: '{p1} debe lamer el zapato de {p2}.' } },
  { id: 'sub18', level: 'submission', text: { es: '{p1} debe dejarse poner un collar por {p2}.' } },
  { id: 'sub19', level: 'submission', text: { es: '{p1} debe lamer las axilas de {p2}.' } },
  { id: 'sub20', level: 'submission', text: { es: '{p1} debe pedir permiso para respirar cerca de {p2}.' } },
  { id: 'sub21', level: 'submission', text: { es: '{p1} debe ser la silla de {p2} por 1 min.' } },
  { id: 'sub22', level: 'submission', text: { es: '{p1} debe lamer el sexo de {p2} y tragar.' } },
  { id: 'sub23', level: 'submission', text: { es: '{p1} debe dejar que {p2} le muerda el pecho con fuerza.' } },
  { id: 'sub24', level: 'submission', text: { es: '{p1} debe lamer el ano de {p2} sin usar las manos.' } },
  { id: 'sub25', level: 'submission', text: { es: '{p1} debe ser el reposapiés de {p2}.' } },
  { id: 'sub26', level: 'submission', text: { es: '{p1} debe recibir 20 nalgadas rápidas de {p2}.' } },
  { id: 'sub27', level: 'submission', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 le orina (si p2 quiere).' } },
  { id: 'sub28', level: 'submission', text: { es: '{p1} debe confesar su secreto más humillante ante {p2}.' } },
  { id: 'sub29', level: 'submission', text: { es: '{p1} debe dejar que {p2} le tire del pelo con fuerza.' } },
  { id: 'sub30', level: 'submission', text: { es: '{p1} debe lamer el ano de {p2} y luego lamer el suelo.' } },
  { id: 'sub31', level: 'submission', text: { es: '{p1} debe ser el sirviente de {p2}.' } },
  { id: 'sub32', level: 'submission', text: { es: '{p1} debe lamer los pies de todos los presentes.' } },
  { id: 'sub33', level: 'submission', text: { es: '{p1} debe dejar que {p2} le meta un hielo en el ano.' } },
  { id: 'sub34', level: 'submission', text: { es: '{p1} debe lamer el sexo de {p2} mientras p2 le pega.' } },
  { id: 'sub35', level: 'submission', text: { es: '{p1} debe ser el perro de {p2}.' } },
  { id: 'sub36', level: 'submission', text: { es: '{p1} debe dejar que {p2} le pise la entrepierna.' } },
  { id: 'sub37', level: 'submission', text: { es: '{p1} debe lamer el ano de {p2} mientras p2 fuma.' } },
  { id: 'sub38', level: 'submission', text: { es: '{p1} debe recibir azotes en las nalgas con un cinturón.' } },
  { id: 'sub39', level: 'submission', text: { es: '{p1} debe lamer el sexo de {p2} y decir "Gracias".' } },
  { id: 'sub40', level: 'submission', text: { es: '{p1} debe ser atado de pies y manos.' } },
  { id: 'sub41', level: 'submission', text: { es: '{p1} debe lamer el ano de {p2} y luego besar a p2.' } },
  { id: 'sub42', level: 'submission', text: { es: '{p1} debe dejar que {p2} le ponga una pinza en el pezón.' } },
  { id: 'sub43', level: 'submission', text: { es: '{p1} debe lamer el sexo de {p2} mientras el grupo se ríe.' } },
  { id: 'sub44', level: 'submission', text: { es: '{p1} debe ser el juguete de {p2}.' } },
  { id: 'sub45', level: 'submission', text: { es: '{p1} debe dejar que {p2} le muerda el culo.' } },
  { id: 'sub46', level: 'submission', text: { es: '{p1} debe lamer el ano de {p2} y tragar el lubricante.' } },
  { id: 'sub47', level: 'submission', text: { es: '{p1} debe ser el cenicero de {p2} (metafórico).' } },
  { id: 'sub48', level: 'submission', text: { es: '{p1} debe recibir 50 nalgadas seguidas.' } },
  { id: 'sub49', level: 'submission', text: { es: '{p1} debe lamer el sexo de {p2} hasta que p2 diga "Basta".' } },
  { id: 'sub50', level: 'submission', text: { es: '{p1} debe lamer el ano de {p2} y terminar con un gemido de dolor.' } }
];

// Función para obtener el texto final (Solo Castellano)
export function getChallengeText(challenge: Challenge, lang: Language, p1: Player, p2: Player): string {
  const textObj = challenge.text.es;
  let rawText = '';
  
  if (typeof textObj === 'string') {
    rawText = textObj;
  } else {
    // Concordancia anatómica según el género de p2
    rawText = textObj[p2.gender] || textObj['M'];
  }

  return rawText.replace(/{p1}/g, p1.name).replace(/{p2}/g, p2.name).replace(/\bp2\b/gi, p2.name).replace(/\bp1\b/gi, p1.name);
}
