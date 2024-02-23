use::std::process::Command;
use::std::env;
use std::path::Path;
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn decompileApk(path: &str) -> () {
  println!("path {:?}", path);
    let outputDir = Path::new(path).parent();
    println!("{:?}", outputDir);
    let binDirPath = env::current_dir().unwrap().join("bin");
    let output = if cfg!(target_os = "windows") {
    Command::new("cmd")
        .args(["/C", "echo hello"])
        .output()
        .expect("failed to execute process");
    } else {
    Command::new(binDirPath.join("apktool"))
        .arg("d")
        // .arg("-o ".join(outputDir))
        .arg(path)
        .spawn()
        .expect("failed to execute process");
    };

}