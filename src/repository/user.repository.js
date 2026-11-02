import { pool } from "../utils/db.js"
export async function getByNameAndPassword(user) {
    const { name, password } = user
    // console.log(name)
    const sql = `SELECT * FROM auth WHERE name = ? AND password = ?`
    const [rows] = await pool.query(sql, [name, password]) // escaping findet auf dem express server, durch mysql2 statt -> einmalige abfragen oder dynamisch
    const [therows] = await pool.execute(sql, [name, password]) // escaping findet auf dem mysql server statt -> für wiederholte abfragen 
    console.log(rows[0].name)
    return rows
}

// Vermeide unsichere Abfragen ↓ ist der Teufel
// const sql = `SELECT * FROM auth WHERE name = ${name}`
// const [rows] = pool.query(sql)

// Nutze prepared Statements ↓ ist toll
// const [rows] = pool.execute('SELECT * FROM auth WHERE name = ?', [name])


/**
 * Angriffsvektor               Was passiert?                               Wichtigste Gegenmaßnahme
 * 
 * SQL - Injektion              Eingaben werden als SQL Code ausgeführt     Prepared Statements (execute() mit ?)
 * 
 * Schwache oder                Angreifer logt sich direkt in MySQL ein     Starkes Password, kein root für die App              
 * Standard Passwörter
 * 
 * Offener Port 3306            Datenbank ist direkt aus dem                Firewall, nur localhost oder internes Netz
 *                              Internet erreichbar
 * 
 * Klartext Passwörter          Nach einem Datenleck sind alles Passwörter  Hashing mit bycrypt oder argon2
 * in der DB                    lesbar 
 * 
 * Zu viele Rechte              Ein Fehler in der App gefährdet die ganze   Least Privilege: eigener DB Nutzer mit minimalen Rechten
 *                              Datenbank  
 * 
 * Ausführliche                 Fehlertexte verraten Tabellen und Spalten   Fehler loggen, dem Nutzer nur allgemeine Meldungen zeigen 
 * Fehlermeldungen
 * 
 * 
 * Veraltete Software           Bekannte Sicherheitslücken in MySQL oder    Regelmäßige Updates
 *                              Treibern
 * 
 * Ungesicherte Backups         Dumps oder .env Dateien die offen rum       Zugriffsrechte, Verschlüsselung, nichts ins Git Repo
 * und Zugangsdaten             liegen
 *                              
 */