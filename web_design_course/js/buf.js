function showNextLevel(disk_name) {
    var disk = document.getElementById(disk_name);
    if (disk.style.display == "inline")
    {
        document.getElementById("disk").display = "none";
    }
}