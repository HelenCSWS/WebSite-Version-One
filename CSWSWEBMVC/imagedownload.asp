<%@language=vbscript%>
<%option explicit%>
<%Response.Buffer = True%>

<%
    Dim year, index
    year = request("year")
    index = request("idx")
    Dim filePath
    filePath = server.mappath("images\HighResolution\" + year + "\" + index + ".jpg")

    Dim objFSO, objFile, objStream, intFileSize
    Set objFSO = Server.CreateObject("Scripting.FileSystemObject")
    If objFSO.FileExists(filePath) Then
        Set objFile = objFSO.GetFile(filePath)
        intFileSize = objFile.Size
        Set objFile = Nothing
    
        Response.ContentType = "image/jpeg"
        Response.AddHeader "Content-Length", intFileSize
        Response.AddHeader "Content-Disposition","attachment; filename=ChristopherStewart_Gallery" + year + "_" + index + ".jpg"

        Set objStream = Server.CreateObject("ADODB.Stream")
        objStream.Open
        objStream.Type = 1 'adTypeBinary
        objStream.LoadFromFile filePath
        Do While Not objStream.EOS And Response.IsClientConnected
            Response.BinaryWrite objStream.Read(32768)
            Response.Flush()
        Loop
        objStream.Close
        Set objStream = Nothing
    Else
        Response.Status = "404 File Not Found"
        Response.write "File Not Found."
    End if
    Set objFSO = Nothing

    Function ReadBinaryFile(FileName)
      Const adTypeBinary = 1
  
      'Create Stream object
      Dim BinaryStream
      Set BinaryStream = CreateObject("ADODB.Stream")
  
      'Specify stream type - we want To get binary data.
      BinaryStream.Type = adTypeBinary
  
      'Open the stream
      BinaryStream.Open
  
      'Load the file data from disk To stream object
      BinaryStream.LoadFromFile FileName
  
      'Open the stream And get binary data from the object
      ReadBinaryFile = BinaryStream.Read
    End Function
%>