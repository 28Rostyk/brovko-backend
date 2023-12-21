const fs = require("fs/promises");
const path = require("path");

const initialDirPath = path.join(__dirname, "../", "temp");

// Якщо передавати filePath - видалить вказаний файл
// Якщо не передавати нічого - очистить всю папку temp
async function clearTemp(filePath, dirPath = initialDirPath) {
  if (!filePath) {
    await clearAllIntoDir(dirPath);
    return;
  }

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`Помилка: файл ${filePath} не існує`);
    } else {
      console.error("Помилка при видаленні файлу:", error);
    }
  }
}

async function clearAllIntoDir(dirPath) {
  try {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      file !== ".gitkeep" && (await fs.unlink(filePath));
    }
  } catch (error) {
    console.error("Помилка під час видалення файлів:", error);
  }
}

module.exports = { clearTemp };
