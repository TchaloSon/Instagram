package com.ensah.core.web.models;

import lombok.Data;
import lombok.NonNull;

@Data
public class ExcelFileModel {

    @NonNull
    private  Integer id_etudiant,id_niveau_actuel;
    @NonNull
    private  String cne,nom,prenom,type;

}
