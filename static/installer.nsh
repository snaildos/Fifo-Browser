!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "Fifo" "Software\Clients\StartMenuInternet\Fifo\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\Fifo" "" "Fifo HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\Fifo\Application" "AppUserModelId" "Fifo"
  WriteRegStr SHCTX "SOFTWARE\Classes\Fifo\Application" "ApplicationIcon" "$INSTDIR\Fifo.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Fifo\Application" "ApplicationName" "Fifo"
  WriteRegStr SHCTX "SOFTWARE\Classes\Fifo\Application" "ApplicationCompany" "Fifo"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Fifo\Application" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Fifo\DefaultIcon" "DefaultIcon" "$INSTDIR\Fifo.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Fifo\shell\open\command" "" '"$INSTDIR\Fifo.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "Fifo" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "Fifo" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo" "" "Fifo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo\DefaultIcon" "" "$INSTDIR\Fifo.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo\Capabilities" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo\Capabilities" "ApplicationName" "Fifo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo\Capabilities" "ApplicationIcon" "$INSTDIR\Fifo.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo\Capabilities\FileAssociations" ".htm" "Fifo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo\Capabilities\FileAssociations" ".html" "Fifo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo\Capabilities\URLAssociations" "http" "Fifo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo\Capabilities\URLAssociations" "https" "Fifo"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo\Capabilities\StartMenu" "StartMenuInternet" "Fifo"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo\shell\open\command" "" "$INSTDIR\Fifo.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\Fifo"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\Fifo"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "Fifo"
!macroend