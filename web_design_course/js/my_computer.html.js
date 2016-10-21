function hideOrShow(disk_name) {
    document.getElementById(disk_name).style.display = "none";
    var disk = document.getElementById(disk_name);
    if (disk.style.display == "inline")
    {
        disk.style.display = "none";
    }
    else if (disk.style.display == "none")
    {
        disk.style.display = "inline";
    }
}