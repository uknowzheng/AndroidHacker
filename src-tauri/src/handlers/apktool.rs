use std::process::Child;
use::std::process::Command;
use::std::env;
use std::path::Path;
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn decompileApk(path: &str) -> i32 {
  println!("path {:?}", path);
    let output_dir = Path::new(path).parent().unwrap().to_str().unwrap();
    let file_name = Path::new(path).file_stem().unwrap().to_str().unwrap();
    let bin_dir_path = env::current_dir().unwrap().join("bin");
    println!("outputDir: {}/{}",output_dir,file_name);
    let mut child:Child;
    if cfg!(target_os = "windows") {
      //TODO：for windows
      child = Command::new(bin_dir_path.join("apktool.bat"))
        .arg("d")
        .arg("-o")
        .arg(format!("{}/{}",output_dir,file_name))
        .arg(path)
        .spawn()
        .expect("failed to execute process");
    } else {
      child = Command::new(bin_dir_path.join("apktool"))
        .arg("d")
        .arg("-o")
        .arg(format!("{}/{}",output_dir,file_name))
        .arg(path)
        .spawn()
        .expect("failed to execute process");
    };
    let status = child.wait().expect("failed to wait for process");
    // 输出命令执行状态
    status.code().unwrap_or_default()
}