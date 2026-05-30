# REPONSES.md

# Exercice 1 — Configuration de l’application

## Question 1.1 — Que représente le dataProvider dans React-Admin ? Quel est son rôle ?

Le **dataProvider** est l’un des éléments les plus importants de React-Admin.

Il sert d’**intermédiaire entre l’interface React-Admin et l’API backend**.

En d’autres termes, il permet à React-Admin de communiquer avec le serveur ou la base de données.

Dans ce projet, nous utilisons :

```js
jsonServerProvider("http://localhost:3002")
```

Cela signifie que React-Admin doit envoyer ses requêtes HTTP vers notre API JSON Server disponible sur le port **3002**.

Le rôle principal du dataProvider est de transformer les actions de l’utilisateur en requêtes HTTP.

Exemples :

| Action utilisateur   | Requête envoyée     |
| -------------------- | ------------------- |
| Afficher la liste    | GET /employees      |
| Créer un employé     | POST /employees     |
| Modifier un employé  | PUT /employees/1    |
| Supprimer un employé | DELETE /employees/1 |

Exemple concret :

Lorsque l’utilisateur clique sur **Créer**, React-Admin ne sait pas automatiquement comment sauvegarder les données.

Le dataProvider intervient alors pour dire :

> « Pour enregistrer cet employé, envoie une requête POST à l’API. »

On peut considérer le dataProvider comme un **traducteur entre React-Admin et le backend**.

---

## Question 1.2 — Quelle requête HTTP est envoyée au chargement de la liste ?

Lors du chargement de la page liste des employés, React-Admin envoie automatiquement une requête HTTP :

```http
GET http://localhost:3002/employees
```

Cette requête peut être observée dans :

**Navigateur → Inspecter → Onglet Network**

### Explication

La méthode **GET** sert à **demander des données au serveur**.

Ici, React-Admin veut récupérer la liste complète des employés.

L’API répond alors avec un tableau JSON contenant les employés.

Exemple de réponse :

```json
[
  {
    "id":1,
    "firstname":"Alice",
    "lastname":"Martin"
  }
]
```

React-Admin utilise ensuite ces données pour remplir automatiquement le tableau affiché à l’écran.

---

# Exercice 2 — Liste des employés

## Question 2.1 — Que fait la prop rowClick="edit" sur le Datagrid ?

La propriété :

```jsx
rowClick="edit"
```

définit le comportement lorsque l’utilisateur clique sur une ligne du tableau.

Avec `"edit"` :

* chaque ligne devient cliquable
* un clic ouvre automatiquement la page de modification de l’employé.

Exemple :

L’utilisateur clique sur **Alice Martin**.

React-Admin redirige automatiquement vers :

```text
/employees/1
```

et ouvre le formulaire d’édition.

Cela améliore l’expérience utilisateur car il n’est pas nécessaire de cliquer sur un bouton Modifier séparé.

---

## Question 2.2 — Que se passe-t-il lorsque perPage = 2 ?

La propriété :

```jsx
perPage={2}
```

contrôle le nombre d’éléments affichés par page.

Avec :

```jsx
perPage={5}
```

React-Admin affiche **5 employés maximum par page**.

Si on change pour :

```jsx
perPage={2}
```

alors seulement **2 employés sont affichés simultanément**.

Conséquences dans l’interface :

* le tableau contient moins de lignes
* la pagination devient plus visible
* il faut utiliser les boutons de navigation pour voir les autres employés.

Exemple :

Supposons qu’il y ait 6 employés.

Avec `perPage=2` :

Page 1 → employés 1-2

Page 2 → employés 3-4

Page 3 → employés 5-6

---

# Exercice 3 — Création d’un employé

## Question 3.1 — Que se passe-t-il si le prénom n’est pas rempli ?

Le champ prénom possède la validation :

```jsx
validate={required()}
```

Cela signifie que ce champ est **obligatoire**.

Si l’utilisateur soumet le formulaire sans renseigner le prénom :

* React-Admin bloque l’envoi
* aucune requête POST n’est envoyée
* un message d’erreur apparaît dans le formulaire.

Exemple :

```text
Required
```

ou

```text
Ce champ est obligatoire
```

selon la configuration.

L’objectif est d’empêcher l’enregistrement de données incomplètes.

---

## Question 3.2 — Que se passe-t-il avec un salaire de 500 € ?

Le salaire possède cette validation :

```jsx
minValue(1500)
```

Cela impose un salaire minimum de **1500 euros**.

Si l’utilisateur saisit :

```text
500
```

alors :

* la validation échoue
* React-Admin refuse la soumission
* un message d’erreur apparaît.

Exemple :

```text
Must be greater than 1500
```

Aucune création d’employé n’est effectuée.

Cette règle permet de contrôler la cohérence des données métier.

---

# Exercice 4 — Modification d’un employé

## Question 4.1 — Quelle méthode HTTP est utilisée lors d’une modification ?

Lors de la sauvegarde d’une modification, React-Admin envoie généralement :

```http
PUT
```

ou parfois :

```http
PATCH
```

selon la configuration du dataProvider.

Avec **json-server**, on observe généralement une requête similaire à :

```http
PUT http://localhost:3002/employees/1
```

### Différence rapide

**PUT**

remplace l’enregistrement complet.

**PATCH**

modifie uniquement certains champs.

Exemple :

PUT :

```json
{
 "firstname":"Alice",
 "lastname":"Martin"
}
```

réécrit entièrement la ressource.

PATCH :

modifie seulement les champs envoyés.

Cette requête est observable dans :

**Inspecter → Network**

---

## Question 4.2 — Quand useRecordContext() est-il disponible ?

`useRecordContext()` est un hook React-Admin permettant d’accéder à l’enregistrement actuellement chargé.

Exemple :

```jsx
const record = useRecordContext();
```

Il devient disponible **après le chargement des données depuis l’API**.

Exemple :

React-Admin envoie :

```http
GET /employees/1
```

Lorsque la réponse arrive, `record` contient les données de l’employé.

Exemple :

```js
{
 id:1,
 firstname:"Alice",
 lastname:"Martin"
}
```

Mais avant la fin du chargement, les données ne sont pas encore disponibles.

Dans ce cas :

```js
record
```

peut être :

```js
undefined
```

C’est pourquoi on utilise souvent une protection :

```jsx
record ? record.firstname : ""
```

Cela évite une erreur JavaScript comme :

```text
Cannot read properties of undefined
```

---

# Exercice 5 — Fiche détail

## Question 5.1 — Différence entre SimpleShowLayout et TabbedShowLayout

Ces deux composants servent à afficher une fiche détail en lecture seule.

### SimpleShowLayout

Affiche les champs dans une mise en page simple.

Exemple :

```text
Firstname : Alice
Lastname : Martin
Email : alice@company.com
Department : Informatique
```

Tous les champs apparaissent sur une seule page.

Il est adapté aux petites fiches simples.

---

### TabbedShowLayout

Affiche les données sous forme d’onglets.

Exemple :

**Informations personnelles**

* prénom
* nom
* email

**Informations RH**

* département
* salaire
* actif

L’utilisateur peut changer d’onglet pour organiser les données.

Il est utile lorsque l’application contient beaucoup d’informations.

---

Résumé :

**SimpleShowLayout**

→ simple, rapide, une seule page.

**TabbedShowLayout**

→ organisé, plusieurs onglets, adapté aux gros formulaires.